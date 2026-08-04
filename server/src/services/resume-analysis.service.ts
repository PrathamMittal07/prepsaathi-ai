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
      throw new Error('Resume text was not properly extracted during upload. Please re-upload the resume.');
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
