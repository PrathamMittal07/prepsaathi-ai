import { z } from 'zod';

export const updateResumeMetadataSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    visibility: z.enum(['PRIVATE', 'PUBLIC']).optional()
  })
});

export const resumeUploadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    uploadSource: z.string().optional(),
    templateName: z.string().optional()
  })
});
