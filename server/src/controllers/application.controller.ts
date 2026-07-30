import { prisma } from '../utils/prisma';
import { Request, Response, NextFunction } from 'express';
import { PrismaClient, ApplicationStatus } from '@prisma/client';


export class ApplicationController {
  static async listApplications(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const applications = await prisma.application.findMany({
        where: { userId },
        include: {
          opportunity: {
            include: {
              company: true
            }
          }
        },
        orderBy: { updatedAt: 'desc' }
      });
      res.status(200).json({ data: applications });
    } catch (error) { next(error); }
  }

  static async createApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { opportunityId, status, notes } = req.body;

      // Prevent duplicates
      const existing = await prisma.application.findFirst({
        where: { userId, opportunityId }
      });

      if (existing) {
        return res.status(400).json({ error: 'Application already exists for this opportunity' });
      }

      const application = await prisma.application.create({
        data: {
          userId,
          opportunityId,
          status: status || ApplicationStatus.SAVED,
          notes: notes || null
        },
        include: {
          opportunity: {
            include: {
              company: true
            }
          }
        }
      });
      res.status(201).json({ data: application });
    } catch (error) { next(error); }
  }

  static async updateApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const applicationId = id as string;
      const { status, notes } = req.body;

      const application = await prisma.application.findUnique({ where: { id: applicationId } });
      if (!application || application.userId !== userId) {
        return res.status(404).json({ error: 'Application not found' });
      }

      const updated = await prisma.application.update({
        where: { id: applicationId },
        data: {
          status: status || undefined,
          notes: notes !== undefined ? notes : undefined
        },
        include: {
          opportunity: {
            include: {
              company: true
            }
          }
        }
      });

      res.status(200).json({ data: updated });
    } catch (error) { next(error); }
  }

  static async deleteApplication(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id;
      const { id } = req.params;
      const applicationId = id as string;

      const application = await prisma.application.findUnique({ where: { id: applicationId } });
      if (!application || application.userId !== userId) {
        return res.status(404).json({ error: 'Application not found' });
      }

      await prisma.application.delete({ where: { id: applicationId } });
      res.status(204).send();
    } catch (error) { next(error); }
  }
}
