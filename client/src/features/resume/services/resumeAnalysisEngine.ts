import { StructuredResumeData } from '../types';

export interface DashboardScores {
  overall: number;
  ats: number;
  roleMatch: number;
  readiness: number;
  completeness: number;
}

export interface SectionHealth {
  name: string;
  score: number;
  status: 'Critical' | 'Needs Work' | 'Good' | 'Excellent';
  details: string[];
}

export interface ResumeStats {
  totalSkills: number;
  totalProjects: number;
  totalExperience: number;
  totalCertificates: number;
  estimatedWordCount: number;
  sectionsFound: number;
  missingSections: string[];
}

export interface Insight {
  title: string;
  description: string;
}

export interface ResumeIntelligenceData {
  scores: DashboardScores;
  sectionHealth: SectionHealth[];
  stats: ResumeStats;
  strengths: Insight[];
  opportunities: Insight[];
}

export function generateResumeIntelligence(parsedData: StructuredResumeData, aiData?: any): ResumeIntelligenceData {
  
  // 1. Calculate Scores (Mock logic based on data presence)
  let completeness = 20; // Base score
  if (parsedData.personalInfo.name && parsedData.personalInfo.email) completeness += 10;
  if (parsedData.personalInfo.linkedin || parsedData.personalInfo.github) completeness += 10;
  if (parsedData.education.length > 0) completeness += 15;
  if (parsedData.skills.length > 0) completeness += 15;
  if (parsedData.experience.length > 0) completeness += 15;
  if (parsedData.projects.length > 0) completeness += 15;

  const scores: DashboardScores = {
    completeness: Math.min(100, completeness),
    ats: parsedData.skills.length > 5 ? 82 : 45, // Mock heuristic
    roleMatch: parsedData.projects.length >= 2 ? 78 : 50, // Mock heuristic
    readiness: parsedData.experience.length >= 1 ? 70 : 35, // Mock heuristic
    overall: 0
  };
  scores.overall = Math.round((scores.completeness + scores.ats + scores.roleMatch + scores.readiness) / 4);

  // 2. Evaluate Section Health
  const sectionHealth: SectionHealth[] = [
    {
      name: 'Personal Information',
      score: parsedData.personalInfo.linkedin && parsedData.personalInfo.email ? 95 : 60,
      status: parsedData.personalInfo.linkedin ? 'Excellent' : 'Needs Work',
      details: [
        parsedData.personalInfo.email ? 'Email found' : 'Missing email',
        parsedData.personalInfo.linkedin ? 'LinkedIn linked' : 'Missing LinkedIn profile',
        parsedData.personalInfo.github ? 'GitHub linked' : 'No GitHub profile found'
      ]
    },
    {
      name: 'Skills',
      score: parsedData.skills.length > 10 ? 90 : (parsedData.skills.length > 0 ? 70 : 0),
      status: parsedData.skills.length > 10 ? 'Excellent' : (parsedData.skills.length > 0 ? 'Good' : 'Critical'),
      details: [`Found ${parsedData.skills.length} skills.`, parsedData.skills.length < 5 ? 'Consider adding more hard skills.' : 'Good volume of skills.']
    },
    {
      name: 'Experience',
      score: parsedData.experience.length > 0 ? 85 : 0,
      status: parsedData.experience.length > 0 ? 'Good' : 'Critical',
      details: [`Found ${parsedData.experience.length} experience entries.`]
    },
    {
      name: 'Projects',
      score: parsedData.projects.length >= 2 ? 90 : (parsedData.projects.length === 1 ? 60 : 0),
      status: parsedData.projects.length >= 2 ? 'Excellent' : (parsedData.projects.length === 1 ? 'Needs Work' : 'Critical'),
      details: [`Found ${parsedData.projects.length} project entries.`]
    },
    {
      name: 'Education',
      score: parsedData.education.length > 0 ? 100 : 0,
      status: parsedData.education.length > 0 ? 'Excellent' : 'Critical',
      details: [`Found ${parsedData.education.length} education entries.`]
    }
  ];

  // 3. Statistics
  const missingSections = [];
  if (parsedData.certifications.length === 0) missingSections.push('Certifications');
  if (parsedData.achievements.length === 0) missingSections.push('Achievements');
  if (parsedData.experience.length === 0) missingSections.push('Experience');

  const stats: ResumeStats = {
    totalSkills: parsedData.skills.length,
    totalProjects: parsedData.projects.length,
    totalExperience: parsedData.experience.length,
    totalCertificates: parsedData.certifications.length,
    estimatedWordCount: 450 + Math.floor(Math.random() * 200), // Mocked for now, since rawText isn't passed here
    sectionsFound: 7 - missingSections.length,
    missingSections
  };

  // 4. Strengths and Weaknesses
  const strengths: Insight[] = [];
  const opportunities: Insight[] = [];

  if (parsedData.personalInfo.github) strengths.push({ title: 'Developer Presence', description: 'GitHub profile is included.' });
  if (parsedData.projects.length >= 2) strengths.push({ title: 'Practical Experience', description: 'Strong project portfolio.' });
  if (parsedData.skills.length >= 8) strengths.push({ title: 'Skill Density', description: 'Good amount of technical skills listed.' });

  if (!parsedData.personalInfo.linkedin) opportunities.push({ title: 'Missing Network', description: 'No LinkedIn profile found. Recruiters expect this.' });
  if (parsedData.experience.length === 0) opportunities.push({ title: 'Professional Gap', description: 'No professional work experience detected.' });
  if (parsedData.certifications.length === 0) opportunities.push({ title: 'No Certifications', description: 'Adding a relevant certification can boost ATS ranking.' });

  // Fallbacks if empty
  if (strengths.length === 0) strengths.push({ title: 'Clean Format', description: 'The resume parsed without critical errors.' });
  if (opportunities.length === 0) opportunities.push({ title: 'Bullet Points', description: 'Ensure all bullet points start with strong action verbs.' });

  // If we have AI Data, override the heuristic values
  if (aiData) {
    if (aiData.scores) {
      scores.overall = aiData.scores.overall || scores.overall;
      scores.ats = aiData.scores.ats || scores.ats;
      scores.roleMatch = aiData.scores.roleMatch || scores.roleMatch;
      scores.readiness = aiData.scores.readiness || scores.readiness;
      scores.completeness = aiData.scores.completeness || scores.completeness;
    }
    
    // AI Section Health Mapping
    if (aiData.sectionHealth && Array.isArray(aiData.sectionHealth)) {
      aiData.sectionHealth.forEach((aiSection: any) => {
        const existingSection = sectionHealth.find(s => s.name.toLowerCase() === aiSection.name?.toLowerCase());
        if (existingSection) {
          existingSection.score = aiSection.score || existingSection.score;
          existingSection.status = aiSection.status || existingSection.status;
          if (aiSection.details && Array.isArray(aiSection.details)) {
            existingSection.details = aiSection.details;
          }
        }
      });
    }

    if (aiData.strengths && Array.isArray(aiData.strengths)) {
      strengths.length = 0; // Clear heuristic strengths
      strengths.push(...aiData.strengths);
    }
    
    if (aiData.opportunities && Array.isArray(aiData.opportunities)) {
      opportunities.length = 0; // Clear heuristic opportunities
      opportunities.push(...aiData.opportunities);
    }
    
    if (aiData.missingSections && Array.isArray(aiData.missingSections)) {
      stats.missingSections = aiData.missingSections;
      stats.sectionsFound = 7 - stats.missingSections.length;
    }
  }

  return {
    scores,
    sectionHealth,
    stats,
    strengths,
    opportunities
  };
}
