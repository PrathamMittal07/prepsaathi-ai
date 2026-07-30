import { prisma } from '../utils/prisma';
import { ResumeParserService } from './resume-parser.service';
import { GeminiService } from './ai/gemini.service';
import path from 'path';


export class ResumeAnalysisService {
  static async requestAnalysis(resumeId: string, targetRole: string) {
    // 1. Fetch Resume
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) throw new Error('Resume not found');
    
    // 2. Extract Text
    let text = resume.extractedText || '';
    if (!text) {
      try {
        if (!resume.secureUrl) {
           throw new Error('Resume does not have a valid Cloudinary URL');
        }
        // Fallback: Download from Cloudinary if text was not extracted
        console.log(`Fallback fetching PDF from Cloudinary for resume ${resumeId}`);
        const response = await fetch(resume.secureUrl as string);
        if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        text = await ResumeParserService.extractText(buffer);
        
        // Optionally, store the fallback text back to db so we don't fetch again
        if (text) {
          await prisma.resume.update({
            where: { id: resumeId },
            data: { extractedText: text }
          });
        }
      } catch (e: any) {
         console.error('PDF Extraction Error:', e.message || e);
         throw new Error('Failed to extract text from PDF: ' + (e.message || 'Unknown Error'));
      }
    }

    // 3. AI Analysis
    let analysisResult;
    try {
       analysisResult = await GeminiService.analyzeResume(text, targetRole);
    } catch (e) {
       throw new Error('AI analysis failed');
    }

    // 4. Save to DB
    // We will update the status and create the analysis record
    await prisma.resume.update({
        where: { id: resumeId },
        data: { status: 'PROCESSED' }
    });

    const analysis = await prisma.resumeAnalysis.upsert({
        where: { resumeId },
        create: {
            resumeId,
            atsScore: analysisResult.atsScore,
            summary: analysisResult.summary,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            missingSkills: analysisResult.missingSkills,
            suggestions: analysisResult.suggestions
        },
        update: {
            atsScore: analysisResult.atsScore,
            summary: analysisResult.summary,
            strengths: analysisResult.strengths,
            weaknesses: analysisResult.weaknesses,
            missingSkills: analysisResult.missingSkills,
            suggestions: analysisResult.suggestions
        }
    });

    return analysis;
  }
}
