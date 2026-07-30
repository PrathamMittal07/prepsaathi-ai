import { prisma } from '../utils/prisma';
import { v4 as uuidv4 } from 'uuid';


export class FileService {
  static async uploadFile(userId: string, file: Express.Multer.File) {
    // In a simplified app, maybe we just save the local path or mock an S3 upload
    const mockS3Key = `uploads/${uuidv4()}-${file.originalname}`;
    const mockS3Url = `https://mock-s3-bucket.s3.amazonaws.com/${mockS3Key}`;

    return prisma.fileRecord.create({
      data: {
        userId,
        fileName: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        s3Key: mockS3Key,
        s3Url: mockS3Url
      }
    });
  }

  static async getFiles(userId: string) {
    return prisma.fileRecord.findMany({ where: { userId } });
  }

  static async getFile(id: string, userId: string) {
    return prisma.fileRecord.findFirst({ where: { id, userId } });
  }

  static async deleteFile(id: string, userId: string) {
    const file = await prisma.fileRecord.findFirst({ where: { id, userId } });
    if (!file) throw new Error('File not found');
    
    // In a real app we would delete from S3 here
    return prisma.fileRecord.delete({ where: { id } });
  }
}
