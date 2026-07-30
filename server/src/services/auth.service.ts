import { prisma } from '../utils/prisma';
import { comparePassword, hashPassword } from '../utils/hash';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../utils/jwt';
import { AppError } from '../middlewares/error';


export class AuthService {
  static async register(data: any) {
    const existingUser = await prisma.user.findUnique({ where: { email: data.email } });
    if (existingUser) throw new AppError('Email already in use', 400);

    const passwordHash = await hashPassword(data.password);
    
    const user = await prisma.user.create({
      data: {
        email: data.email,
        passwordHash,
        roles: ['STUDENT'],
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName,
          }
        },
        careerProfile: {
          create: {}
        }
      }
    });

    return this.createTokensAndSession(user);
  }

  static async login(data: any) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) throw new AppError('Invalid email or password', 401);
    
    const isValid = await comparePassword(data.password, user.passwordHash);
    if (!isValid) throw new AppError('Invalid email or password', 401);

    return this.createTokensAndSession(user);
  }

  static async refreshToken(token: string) {
    const payload = verifyRefreshToken(token);
    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });
    if (!session || session.expiresAt < new Date()) throw new AppError('Invalid or expired refresh token', 401);

    return this.createTokensAndSession(session.user);
  }

  private static async createTokensAndSession(user: any) {
    const payload = { userId: user.id, roles: user.roles };
    const accessToken = generateAccessToken(payload);
    const refreshToken = generateRefreshToken(payload);

    await prisma.session.create({
      data: {
        userId: user.id,
        token: refreshToken,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
      }
    });

    return {
      user: { id: user.id, email: user.email, roles: user.roles },
      accessToken,
      refreshToken
    };
  }
}
