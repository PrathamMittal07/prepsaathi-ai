import { prisma } from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';
import { ResumeAnalysisService } from '../services/resume-analysis.service';
import { ResumeMatchService } from '../services/resume-match.service';


export class ResumeAnalysisController {
  static async requestAnalysis(req: Request, res: Response, next: NextFunction) {
    try {
      const resumeId = req.params.id as string;
      const { targetRole } = req.body;
      
      const analysis = await ResumeAnalysisService.requestAnalysis(resumeId, targetRole || 'Software Engineer');
      
      res.status(200).json({ data: analysis });
    } catch (error) { next(error); }
  }

  static async getAnalysisStatus(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: { status: 'PROCESSED' } });
  }

  static async getAnalysisResult(req: Request, res: Response, next: NextFunction) {
    try {
      const resumeId = req.params.id as string;
      const analysis = await prisma.resumeAnalysis.findUnique({ where: { resumeId } });
      res.status(200).json({ data: analysis });
    } catch (error) { next(error); }
  }

  static async requestMatch(req: Request, res: Response, next: NextFunction) {
    try {
      const resumeId = req.params.id as string;
      const { jobDescription } = req.body;

      if (!jobDescription || jobDescription.trim().length === 0) {
        return res.status(400).json({ error: 'Job description is required' });
      }

      const match = await ResumeMatchService.requestMatch(resumeId, jobDescription);
      res.status(200).json({ data: match });
    } catch (error) { next(error); }
  }

  static async getMatches(req: Request, res: Response, next: NextFunction) {
    try {
      const resumeId = req.params.id as string;
      const matches = await ResumeMatchService.getMatches(resumeId);
      res.status(200).json({ data: matches });
    } catch (error) { next(error); }
  }

  static async provideFeedback(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }
}
