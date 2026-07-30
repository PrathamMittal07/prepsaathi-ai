import { z } from 'zod';

export const userProfileSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    headline: z.string().optional(),
    bio: z.string().optional(),
    avatarUrl: z.string().optional(),
  })
});

export const updateRoleSchema = z.object({
  body: z.object({
    roles: z.array(z.string()).min(1)
  })
});
