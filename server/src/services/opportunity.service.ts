import { prisma } from '../utils/prisma';


export class OpportunityService {
  static async getOpportunities() {
    return prisma.opportunity.findMany({ include: { company: true } });
  }

  static async getOpportunity(id: string) {
    return prisma.opportunity.findUnique({ where: { id }, include: { company: true } });
  }

  static async createOpportunity(data: any) {
    return prisma.opportunity.create({ data });
  }

  static async updateOpportunity(id: string, data: any) {
    return prisma.opportunity.update({ where: { id }, data });
  }

  static async deleteOpportunity(id: string) {
    return prisma.opportunity.delete({ where: { id } });
  }
}
