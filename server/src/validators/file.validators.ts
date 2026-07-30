import { z } from 'zod';

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const ALLOWED_MIME_TYPES = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // DOCX
  'application/msword', // DOC
  'image/png',
  'image/jpeg',
  'image/jpg',
  'text/plain',
];

export const fileUploadSchema = z.object({
  // Zod can validate the metadata passed with the form data if needed.
  // The file itself is validated by multer and business logic.
  body: z.object({
    folder: z.string().optional()
  })
});
