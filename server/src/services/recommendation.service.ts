import { prisma } from '../utils/prisma';


export class RecommendationService {
  static async getRecommendations(userId: string) {
    return prisma.jobRecommendation.findMany({
      where: { userId },
      include: { opportunity: true },
      orderBy: { overallScore: 'desc' }
    });
  }

  static async generateRecommendations(userId: string) {
    // Basic mock implementation for simple rule-based generation
    const user = await prisma.user.findUnique({ where: { id: userId }, include: { careerProfile: true } });
    const opportunities = await prisma.opportunity.findMany({ where: { status: 'OPEN' } });

    if (!user || !user.careerProfile) return [];

    const recommendations = [];

    for (const opp of opportunities) {
      // Mock logic
      let score = 0.8;
      recommendations.push({
        userId,
        opportunityId: opp.id,
        overallScore: score,
        scoreBreakdown: { skillMatch: score, experienceMatch: score, educationMatch: score },
        missingSkills: [],
        rationale: 'Good match based on rules.'
      });
    }

    // Upsert all
    const results = [];
    for (const rec of recommendations) {
      const res = await prisma.jobRecommendation.upsert({
        where: { userId_opportunityId: { userId: rec.userId, opportunityId: rec.opportunityId } },
        create: rec,
        update: rec
      });
      results.push(res);
    }

    return results;
  }
}
