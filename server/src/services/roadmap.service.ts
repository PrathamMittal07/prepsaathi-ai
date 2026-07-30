import { prisma } from '../utils/prisma';


export class RoadmapService {
  static async getUserRoadmaps(userId: string) {
    return prisma.roadmap.findMany({
      where: { userId },
      include: {
        missions: {
          include: { milestones: true },
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });
  }

  static async generateRoadmap(userId: string, targetRole: string) {
    // A simplified rule-based roadmap generator for the simplified version
    // instead of an AI-based one.
    return prisma.roadmap.create({
      data: {
        userId,
        title: `Roadmap to ${targetRole}`,
        targetRole,
        missions: {
          create: [
            {
              title: 'Learn the Basics',
              order: 1,
              milestones: {
                create: [
                  { title: 'Understand core concepts', order: 1 },
                  { title: 'Build a small project', order: 2 }
                ]
              }
            }
          ]
        }
      },
      include: {
        missions: { include: { milestones: true } }
      }
    });
  }
}
