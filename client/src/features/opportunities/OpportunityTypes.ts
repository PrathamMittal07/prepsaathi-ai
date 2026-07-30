export type OpportunityType = 'Internship' | 'Full-Time' | 'Hackathon' | 'Competition' | 'Open Source';
export type ApplicationStage = 'Saved' | 'Applied' | 'OA Scheduled' | 'Interview Scheduled' | 'Rejected' | 'Offer Received' | 'Withdrawn';

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  type: OpportunityType;
  location: string;
  deadline: string; // ISO date
  requiredSkills: string[];
  preferredSkills: string[];
  minCgpa?: number;
  expectedGraduationYears?: number[];
  applyUrl: string;
}

export interface ReadinessAnalysis {
  opportunityId: string;
  matchPercentage: number;
  isEligible: boolean;
  missingSkills: string[];
  strongSkills: string[];
  estimatedPrepTimeDays: number;
  recommendedImprovements: string[];
  applicationConfidence: 'Low' | 'Medium' | 'High';
}

export interface ApplicationRecord {
  id: string;
  opportunity: Opportunity;
  stage: ApplicationStage;
  appliedDate?: string;
  nextAction?: string;
  notes?: string;
}
