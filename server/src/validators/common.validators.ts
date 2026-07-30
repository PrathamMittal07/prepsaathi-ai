import { z } from 'zod';

export const paginationSchema = z.object({
  query: z.object({
    limit: z.string().optional().transform(v => v ? parseInt(v, 10) : 20),
    cursor: z.string().optional(),
    search: z.string().optional()
  })
});
