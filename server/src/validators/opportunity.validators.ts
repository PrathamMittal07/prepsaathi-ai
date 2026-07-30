import { z } from 'zod';

export const createCompanySchema = z.object({
  body: z.object({
    name: z.string().min(2),
    description: z.string().optional(),
    industry: z.string().optional(),
    size: z.string().optional(),
    headquarters: z.string().optional(),
    careersUrl: z.string().url().optional(),
    websiteUrl: z.string().url().optional()
  })
});

export const createOpportunitySchema = z.object({
  body: z.object({
    companyId: z.string().uuid(),
    title: z.string().min(2),
    description: z.string().min(10),
    type: z.enum(['FULL_TIME', 'INTERNSHIP', 'HACKATHON', 'FREELANCE', 'PART_TIME']),
    location: z.string().optional(),
    salaryInfo: z.object({
      min: z.number().optional(),
      max: z.number().optional(),
      currency: z.string().default('USD')
    }).optional(),
    skillsRequired: z.array(z.string()).default([]),
    eligibilityRules: z.object({
      minCgpa: z.number().min(0).max(10).optional(),
      graduationYear: z.array(z.number()).optional(),
      branches: z.array(z.string()).optional()
    }).optional(),
    deadline: z.string().datetime().optional()
  })
});

export const applyOpportunitySchema = z.object({
  body: z.object({
    resumeVersionId: z.string().uuid().optional()
  })
});

export const updateApplicationStatusSchema = z.object({
  body: z.object({
    status: z.enum(['PENDING', 'REVIEWING', 'INTERVIEWING', 'OFFERED', 'REJECTED']),
    notes: z.string().optional()
  })
});
