import { Request, Response, NextFunction } from 'express';
import { RecommendationService } from '../services/recommendation.service';

export class RecommendationController {
  static async getRecommendations(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const recs = await RecommendationService.getRecommendations(id);
      res.status(200).json({ data: recs });
    } catch (error) { next(error); }
  }

  static async triggerGeneration(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.user!;
      const recs = await RecommendationService.generateRecommendations(id);
      res.status(201).json({ data: recs });
    } catch (error) { next(error); }
  }

  static async getFeedback(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async getInsights(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }
}
