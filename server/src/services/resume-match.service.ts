import { prisma } from '../utils/prisma';
import { ResumeParserService } from './resume-parser.service';
import { GeminiService } from './ai/gemini.service';
import path from 'path';


export class ResumeMatchService {
  static async requestMatch(resumeId: string, jobDescription: string) {
    // 1. Fetch Resume
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    if (!resume) throw new Error('Resume not found');
    
    // 2. Extract Text
    let text = '';
    try {
      if (!resume.secureUrl) {
         throw new Error('Resume does not have a valid Cloudinary URL');
      }
      // Download from Cloudinary
      const response = await fetch(resume.secureUrl);
      if (!response.ok) throw new Error(`Failed to fetch PDF: ${response.statusText}`);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      text = await ResumeParserService.extractText(buffer);
    } catch (e) {
       throw new Error('Failed to extract text from PDF');
    }

    // 3. AI Analysis
    let matchResult;
    try {
       matchResult = await GeminiService.matchResumeWithJD(text, jobDescription);
    } catch (e) {
       throw new Error('AI match analysis failed');
    }

    // 4. Save to DB
    const matchRecord = await prisma.resumeMatch.create({
        data: {
            resumeId,
            jobDescription,
            matchScore: matchResult.matchScore,
            feedback: matchResult
        }
    });

    return matchRecord;
  }

  static async getMatches(resumeId: string) {
    return prisma.resumeMatch.findMany({
      where: { resumeId },
      orderBy: { createdAt: 'desc' }
    });
  }
}
