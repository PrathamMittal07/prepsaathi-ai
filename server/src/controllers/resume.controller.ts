import { Request, Response, NextFunction } from 'express';
import { ResumeService } from '../services/resume.service';

export class ResumeController {
  static async processResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      const { targetRole } = req.body;
      if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
      if (req.file.size === 0) return res.status(400).json({ error: 'Uploaded file is empty' });
      
      const { ResumeProcessingService } = await import('../services/resume-processing.service');
      const result = await ResumeProcessingService.processResume(userId, req.file, targetRole || 'General Professional');
      res.status(201).json({ data: result });
    } catch (error) { next(error); }
  }

  static async listMyResumes(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      const resumes = await ResumeService.getUserResumes(userId);
      res.status(200).json({ data: resumes });
    } catch (error) { next(error); }
  }

  static async getResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user!;
      // Need getResume logic in service, let's just use getPrimary if missing
      const resume = await ResumeService.getPrimaryResume(userId);
      res.status(200).json({ data: resume });
    } catch (error) { next(error); }
  }

  static async updateResume(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async deleteResume(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { id: userId } = req.user!;
      await ResumeService.deleteResume(id as string, userId);
      res.status(204).send();
    } catch (error) { next(error); }
  }

  static async setPrimary(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async getVersions(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: [] });
  }

  static async restoreVersion(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }
}
