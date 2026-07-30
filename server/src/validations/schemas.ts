import { z } from 'zod';

const paramIdSchema = z.object({
  id: z.string().uuid('Invalid ID format'),
}).strict();

// Auth Schemas
export const registerSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name is too short'),
    lastName: z.string().min(2, 'Last name is too short'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  }).strict(),
  params: z.object({}).strict().optional(),
  query: z.object({}).strict().optional(),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  }).strict(),
  params: z.object({}).strict().optional(),
  query: z.object({}).strict().optional(),
});

// Resume Schemas
export const analyzeResumeSchema = z.object({
  body: z.object({
    targetRole: z.string().optional(),
  }).strict(),
  params: paramIdSchema,
  query: z.object({}).strict().optional(),
});

export const matchResumeSchema = z.object({
  body: z.object({
    jobDescription: z.string().min(10, 'Job description is too short'),
  }).strict(),
  params: paramIdSchema,
  query: z.object({}).strict().optional(),
});

// Career Coach Schema
export const coachChatSchema = z.object({
  body: z.object({
    message: z.string().min(1, 'Message is required'),
    history: z.array(z.any()).optional(),
  }).strict(),
  params: z.object({}).strict().optional(),
  query: z.object({}).strict().optional(),
});

// Profile Update Schemas
export const updateUserProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(2, 'First name is too short').optional(),
    lastName: z.string().min(2, 'Last name is too short').optional(),
  }).strict(),
  params: z.object({}).strict().optional(),
  query: z.object({}).strict().optional(),
});

export const updateCareerProfileSchema = z.object({
  body: z.object({
    skills: z.array(z.any()).optional(),
    education: z.array(z.any()).optional(),
    experience: z.array(z.any()).optional(),
    preferences: z.any().optional(),
  }).strict(),
  params: z.object({}).strict().optional(),
  query: z.object({}).strict().optional(),
});

// Generic ID Param Schema
export const idParamSchema = z.object({
  body: z.object({}).strict().optional(),
  params: paramIdSchema,
  query: z.object({}).strict().optional(),
});
