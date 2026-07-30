import { prisma } from '../utils/prisma';


export class UserService {
  static async getProfile(userId: string) {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        careerProfile: true,
      },
    });
  }

  static async updateProfile(userId: string, data: any) {
    return prisma.userProfile.upsert({
      where: { userId },
      create: {
        userId,
        firstName: data.firstName || '',
        lastName: data.lastName || '',
        avatarUrl: data.avatarUrl,
        headline: data.headline,
        bio: data.bio,
      },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        avatarUrl: data.avatarUrl,
        headline: data.headline,
        bio: data.bio,
      },
    });
  }

  static async deleteUser(userId: string) {
    return prisma.user.update({
      where: { id: userId },
      data: { deletedAt: new Date() },
    });
  }

  static async updateUserRoles(userId: string, roles: any[]) {
    // Filter roles to only allow STUDENT and ADMIN
    const validRoles = roles.filter(r => r === 'STUDENT' || r === 'ADMIN');
    return prisma.user.update({
      where: { id: userId },
      data: { roles: validRoles },
    });
  }
}
