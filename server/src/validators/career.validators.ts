import { z } from 'zod';

export const careerProfileSchema = z.object({
  body: z.object({
    education: z.any().optional(),
    experience: z.any().optional(),
    skills: z.any().optional(),
    projects: z.any().optional(),
    preferences: z.any().optional(),
  })
});
