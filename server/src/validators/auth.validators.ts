import { z } from 'zod';

export const registerSchema = z.object({
  body: z.object({
    tenantId: z.string().uuid(),
    email: z.string().email(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    role: z.enum(['STUDENT', 'MENTOR', 'RECRUITER']).optional().default('STUDENT') // Only basic roles allowed via normal registration
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string()
  })
});

export const changePasswordSchema = z.object({
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, 'Password must be at least 8 characters long')
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email()
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string(),
    newPassword: z.string().min(8)
  })
});
