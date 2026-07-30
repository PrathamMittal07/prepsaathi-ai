import { prisma } from '../utils/prisma';
import { PrismaClient, ResumeStatus } from '@prisma/client';
import { CloudinaryService } from './cloudinary.service';
import { ResumeParserService } from './resume-parser.service';


export class ResumeService {
  static async uploadResume(userId: string, fileData: Express.Multer.File) {
    // 0. Find existing primary resume and clean up
    const existingPrimary = await prisma.resume.findFirst({
      where: { userId, isPrimary: true }
    });

    if (existingPrimary) {
      if (existingPrimary.publicId) {
        try {
          await CloudinaryService.deletePdf(existingPrimary.publicId);
        } catch (e) {
          console.error('Failed to delete old resume from Cloudinary', e);
        }
      }
      await prisma.resume.delete({ where: { id: existingPrimary.id } });
    }

    // 1. Upload to Cloudinary
    const { publicId, secureUrl } = await CloudinaryService.uploadPdfFromBuffer(fileData.buffer);

    // 2. Extract Text
    let extractedText = '';
    try {
      extractedText = await ResumeParserService.extractText(fileData.buffer);
    } catch (e) {
      console.error('Failed to extract text during upload', e);
    }

    // 3. Insert into DB
    try {
      return await prisma.resume.create({
        data: {
          userId,
          fileUrl: secureUrl,
          fileName: fileData.originalname,
          status: ResumeStatus.UPLOADED,
          version: 1,
          isPrimary: true,
          publicId,
          secureUrl,
          extractedText
        }
      });
    } catch (e) {
      // 4. Database Failure Cleanup
      await CloudinaryService.deletePdf(publicId);
      throw e;
    }
  }

  static async getUserResumes(userId: string) {
    return prisma.resume.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: { analysis: true }
    });
  }

  static async getPrimaryResume(userId: string) {
    return prisma.resume.findFirst({
      where: { userId, isPrimary: true },
      include: { analysis: true }
    });
  }

  static async deleteResume(id: string, userId: string) {
    const resume = await prisma.resume.findUnique({ where: { id } });
    if (!resume || resume.userId !== userId) throw new Error('Not found');
    
    if (resume.publicId) {
      try {
        await CloudinaryService.deletePdf(resume.publicId);
      } catch (e) {
        console.error('Failed to delete resume from Cloudinary', e);
      }
    }
    
    return prisma.resume.delete({
      where: { id }
    });
  }
}
