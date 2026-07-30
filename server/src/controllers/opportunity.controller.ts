import { Request, Response, NextFunction } from 'express';
import { OpportunityService } from '../services/opportunity.service';

export class OpportunityController {
  static async listOpportunities(req: Request, res: Response, next: NextFunction) {
    try {
      const ops = await OpportunityService.getOpportunities();
      res.status(200).json({ data: ops });
    } catch (error) { next(error); }
  }

  static async getOpportunity(req: Request, res: Response, next: NextFunction) {
    try {
      const op = await OpportunityService.getOpportunity(req.params.id as string);
      res.status(200).json({ data: op });
    } catch (error) { next(error); }
  }
}
