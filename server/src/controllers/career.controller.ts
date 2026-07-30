import { prisma } from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';
import { GeminiService } from '../services/ai/gemini.service';


export class CareerController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      let profile = await prisma.careerProfile.findUnique({
        where: { userId },
        include: { user: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } } }
      });
      if (!profile) {
        profile = await prisma.careerProfile.create({
          data: { userId },
          include: { user: { select: { email: true, profile: { select: { firstName: true, lastName: true } } } } }
        });
      }
      res.json({ data: profile });
    } catch (error) {
      next(error);
    }
  }

  static async updateProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const data = req.body;
      const profile = await prisma.careerProfile.upsert({
        where: { userId },
        update: data,
        create: { ...data, userId },
      });
      res.json({ data: profile });
    } catch (error) {
      next(error);
    }
  }

  static async chatWithCoach(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { message, history = [] } = req.body;

      if (!message) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // 1. Gather Context
      let userContext = ``;
      
      const profile = await prisma.careerProfile.findUnique({ where: { userId } });
      if (profile) {
        userContext += `[Profile Data]\n`;
        userContext += `Preferences (incl. Target Roles): ${JSON.stringify(profile.preferences || [])}\n`;
        userContext += `Skills: ${JSON.stringify(profile.skills || [])}\n`;
        userContext += `Education: ${JSON.stringify(profile.education || [])}\n`;
        userContext += `Experience: ${JSON.stringify(profile.experience || [])}\n\n`;
      }

      const primaryResume = await prisma.resume.findFirst({
        where: { userId, isPrimary: true },
        include: { analysis: true }
      });
      
      if (primaryResume && primaryResume.analysis) {
        userContext += `[Primary Resume Analysis]\n`;
        userContext += `ATS Score: ${primaryResume.analysis.atsScore}\n`;
        userContext += `Strengths: ${JSON.stringify(primaryResume.analysis.strengths || [])}\n`;
        userContext += `Weaknesses: ${JSON.stringify(primaryResume.analysis.weaknesses || [])}\n`;
        userContext += `Missing Skills: ${JSON.stringify(primaryResume.analysis.missingSkills || [])}\n\n`;
      } else {
        userContext += `[Primary Resume]\nStatus: Not uploaded or not analyzed yet.\n\n`;
      }

      // 2. Call Gemini
      const reply = await GeminiService.coachChat(message, history, userContext);

      // Return response
      res.json({ data: { reply, suggestedActions: [] } });

    } catch (error) {
      next(error);
    }
  }
}
