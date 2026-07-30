import { prisma } from '../utils/prisma';


export class CompanyService {
  static async getCompanies() {
    return prisma.company.findMany();
  }

  static async getCompany(id: string) {
    return prisma.company.findUnique({ where: { id }, include: { opportunities: true } });
  }

  static async createCompany(data: any) {
    return prisma.company.create({ data });
  }

  static async updateCompany(id: string, data: any) {
    return prisma.company.update({ where: { id }, data });
  }

  static async deleteCompany(id: string) {
    return prisma.company.delete({ where: { id } });
  }
}
