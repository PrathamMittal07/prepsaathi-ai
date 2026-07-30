import { prisma } from '../utils/prisma';


export class CareerService {
  static async getCareerProfile(userId: string) {
    return prisma.careerProfile.findUnique({
      where: { userId }
    });
  }

  static async updateCareerProfile(userId: string, data: any) {
    return prisma.careerProfile.upsert({
      where: { userId },
      create: {
        userId,
        education: data.education,
        experience: data.experience,
        skills: data.skills,
        projects: data.projects,
        preferences: data.preferences
      },
      update: {
        education: data.education,
        experience: data.experience,
        skills: data.skills,
        projects: data.projects,
        preferences: data.preferences
      }
    });
  }
}
