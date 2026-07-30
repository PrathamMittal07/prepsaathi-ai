import { z } from 'zod';

export const createRoadmapSchema = z.object({
  body: z.object({
    title: z.string().min(2),
    description: z.string().optional(),
    targetRole: z.string().optional(),
    isTemplate: z.boolean().default(false)
  })
});

export const updateTaskStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'IN_PROGRESS', 'COMPLETED'])
  })
});
