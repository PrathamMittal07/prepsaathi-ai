import { prisma } from '../utils/prisma';
import { ResumeParserService } from './resume-parser.service';
import { GeminiService } from './ai/gemini.service';
import { CloudinaryService } from './cloudinary.service';
import { logger } from '../utils/logger';

export class ResumeProcessingService {
  /**
   * Processes a resume in a single atomic flow from the memory buffer.
   * Eliminates the need to download the PDF from Cloudinary after uploading.
   */
  static async processResume(userId: string, file: Express.Multer.File, targetRole: string) {
    logger.info(`Starting resume processing pipeline for user ${userId}`);

    // 1. Delete old primary resume
    try {
      const existingPrimary = await prisma.resume.findFirst({
        where: { userId, isPrimary: true }
      });
      if (existingPrimary) {
        if (existingPrimary.publicId) {
          try {
            await CloudinaryService.deletePdf(existingPrimary.publicId);
          } catch (e) {
            logger.error(`Failed to delete old resume from Cloudinary: ${existingPrimary.publicId}`, { error: e });
          }
        }
        await prisma.resume.delete({ where: { id: existingPrimary.id } });
      }
    } catch (e) {
      logger.error('Error during cleanup of old resume', { error: e });
      // Proceed even if cleanup fails
    }

    // 2. Extract Text directly from the buffer
    let resumeText = '';
    try {
      logger.info('Extracting text from PDF buffer...');
      resumeText = await ResumeParserService.extractText(file.buffer);
      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error('Extracted text is empty. The PDF might be image-based or corrupted.');
      }
    } catch (e: any) {
      logger.error('PDF parsing failed:', { error: e.message || e });
      throw new Error(`Failed to parse PDF text: ${e.message || 'Unknown parsing error'}`);
    }

    // 3. Upload to Cloudinary (in parallel with Gemini to save time? No, let's keep it sequential to avoid leaving orphaned files if Gemini fails)
    let cloudinaryResult = null;
    try {
      logger.info('Uploading original PDF to Cloudinary...');
      cloudinaryResult = await CloudinaryService.uploadPdfFromBuffer(file.buffer);
      logger.info(`Cloudinary upload successful. URL: ${cloudinaryResult.secureUrl}`);
    } catch (e: any) {
      logger.error('Cloudinary upload failed:', { error: e.message || e });
      throw new Error(`Failed to store PDF securely: ${e.message || 'Storage error'}`);
    }

    // 4. Gemini Analysis
    let analysisResult = null;
    try {
      logger.info(`Analyzing resume against target role: ${targetRole}`);
      analysisResult = await GeminiService.analyzeResume(resumeText, targetRole);
      logger.info('Gemini analysis complete.');
    } catch (e: any) {
      logger.error('Gemini analysis failed:', { error: e.message || e });
      // If Gemini fails, we should still persist the resume but mark as FAILED
      await prisma.resume.create({
        data: {
          userId,
          fileUrl: cloudinaryResult?.secureUrl || '',
          fileName: file.originalname,
          status: 'FAILED',
          isPrimary: true,
          publicId: cloudinaryResult?.publicId || '',
          secureUrl: cloudinaryResult?.secureUrl || '',
          extractedText: resumeText
        }
      });
      throw new Error(`AI Analysis failed: ${e.message || 'AI timeout or parsing error'}`);
    }

    // 5. Persist Everything to Database
    try {
      logger.info('Persisting resume and analysis metadata to database...');
      // Using a transaction ensures both are created atomically
      const result = await prisma.$transaction(async (tx) => {
        const resume = await tx.resume.create({
          data: {
            userId,
            fileUrl: cloudinaryResult!.secureUrl, // Backwards compat
            fileName: file.originalname,
            status: 'PROCESSED',
            version: 1,
            isPrimary: true,
            publicId: cloudinaryResult!.publicId,
            secureUrl: cloudinaryResult!.secureUrl,
            extractedText: resumeText
          }
        });

        const analysis = await tx.resumeAnalysis.create({
          data: {
            resumeId: resume.id,
            atsScore: analysisResult.atsScore,
            summary: analysisResult.summary,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            missingSkills: analysisResult.missingSkills,
            suggestions: analysisResult.suggestions,
            parsedData: analysisResult // Keep raw JSON if needed
          }
        });

        return { ...resume, analysis };
      });

      logger.info(`Resume processing completed successfully for user ${userId}`);
      return result;
    } catch (e: any) {
      logger.error('Database transaction failed:', { error: e.message || e });
      if (cloudinaryResult?.publicId) {
        await CloudinaryService.deletePdf(cloudinaryResult.publicId).catch(() => {});
      }
      throw new Error(`Failed to save processed resume to database.`);
    }
  }
}
