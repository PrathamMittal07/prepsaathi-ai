import { Request, Response, NextFunction } from 'express';
import { RoadmapService } from '../services/roadmap.service';

export class RoadmapController {
  static async createRoadmap(req: Request, res: Response, next: NextFunction) {
    try {
      const { targetRole } = req.body;
      const { id: userId } = req.user!;
      const roadmap = await RoadmapService.generateRoadmap(userId, targetRole);
      res.status(201).json({ data: roadmap });
    } catch (error) { next(error); }
  }

  static async listMyRoadmaps(req: Request, res: Response, next: NextFunction) {
    try {
      const { id: userId } = req.user!;
      const roadmaps = await RoadmapService.getUserRoadmaps(userId);
      res.status(200).json({ data: roadmaps });
    } catch (error) { next(error); }
  }

  static async getRoadmap(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }

  static async createMission(req: Request, res: Response, next: NextFunction) {
    res.status(201).json({ data: {} });
  }

  static async updateTaskStatus(req: Request, res: Response, next: NextFunction) {
    res.status(200).json({ data: {} });
  }
}
