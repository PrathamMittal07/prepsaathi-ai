import { StructuredResumeData } from '../types';

export interface ExtendedRoleProfile {
  name: string;
  description: string;
  requiredSkills: string[];
  preferredSkills: string[];
  optionalSkills: string[];
  industryWeightage: number; // For prioritizing more in-demand roles
}

export interface RoleMatchResult {
  role: ExtendedRoleProfile;
  compatibilityScore: number;
  matchLevel: 'Excellent Match' | 'Good Match' | 'Needs Improvement' | 'Low Match';
  commonSkills: string[];
  missingRequired: string[];
  missingPreferred: string[];
  uniqueResumeSkills: string[];
}

export interface ComparisonResult {
  roleA: RoleMatchResult;
  roleB: RoleMatchResult;
  commonBetweenRoles: string[];
  uniqueToA: string[];
  uniqueToB: string[];
}

// 1. Extended Role Profiles
export const roleProfilesDB: ExtendedRoleProfile[] = [
  {
    name: 'Software Engineer',
    description: 'Generalist software developer.',
    requiredSkills: ['Java', 'Python', 'SQL', 'Git', 'Data Structures', 'System Design'],
    preferredSkills: ['React', 'Node.js', 'Docker', 'AWS'],
    optionalSkills: ['TypeScript', 'Kubernetes', 'Redis'],
    industryWeightage: 1.0
  },
  {
    name: 'Backend Engineer',
    description: 'Specializes in server-side logic and databases.',
    requiredSkills: ['Java', 'Spring Boot', 'Node.js', 'SQL', 'Microservices', 'Docker'],
    preferredSkills: ['Express', 'MongoDB', 'Redis', 'Kubernetes', 'AWS'],
    optionalSkills: ['GraphQL', 'RabbitMQ', 'Kafka', 'Golang'],
    industryWeightage: 1.2
  },
  {
    name: 'Frontend Engineer',
    description: 'Focuses on user interfaces and web performance.',
    requiredSkills: ['React', 'JavaScript', 'HTML', 'CSS', 'Redux', 'Git'],
    preferredSkills: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Jest'],
    optionalSkills: ['Vue.js', 'Webpack', 'Figma', 'GraphQL'],
    industryWeightage: 1.1
  },
  {
    name: 'Full Stack Engineer',
    description: 'Handles both frontend and backend development.',
    requiredSkills: ['React', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Git'],
    preferredSkills: ['TypeScript', 'Next.js', 'Docker', 'Redis', 'AWS'],
    optionalSkills: ['Tailwind CSS', 'GraphQL', 'Kubernetes'],
    industryWeightage: 1.3
  },
  {
    name: 'Data Analyst',
    description: 'Analyzes data to derive actionable insights.',
    requiredSkills: ['Python', 'SQL', 'Pandas', 'Excel'],
    preferredSkills: ['Tableau', 'PowerBI', 'Statistics', 'R'],
    optionalSkills: ['Machine Learning', 'Jupyter', 'AWS'],
    industryWeightage: 1.0
  },
  {
    name: 'Cloud Engineer',
    description: 'Designs and manages cloud infrastructure.',
    requiredSkills: ['AWS', 'Docker', 'Linux', 'Networking', 'Python'],
    preferredSkills: ['Kubernetes', 'Terraform', 'CI/CD', 'Azure'],
    optionalSkills: ['GCP', 'Bash', 'Jenkins'],
    industryWeightage: 1.4
  },
  {
    name: 'AI Engineer',
    description: 'Builds AI models and LLM applications.',
    requiredSkills: ['Python', 'Machine Learning', 'TensorFlow', 'PyTorch', 'SQL'],
    preferredSkills: ['NLP', 'OpenAI', 'LangChain', 'Docker'],
    optionalSkills: ['Vector Databases', 'AWS', 'C++'],
    industryWeightage: 1.5
  }
];

// 2. Role Matching Engine
export function calculateRoleMatch(
  parsedData: StructuredResumeData, 
  profile: ExtendedRoleProfile
): RoleMatchResult {
  const userSkills = parsedData.skills.map(s => s.toLowerCase().trim());
  
  const commonSkills: string[] = [];
  const missingRequired: string[] = [];
  const missingPreferred: string[] = [];
  const uniqueResumeSkills: string[] = [];

  // Match Required
  profile.requiredSkills.forEach(skill => {
    if (userSkills.some(us => us.includes(skill.toLowerCase()) || skill.toLowerCase().includes(us))) {
      commonSkills.push(skill);
    } else {
      missingRequired.push(skill);
    }
  });

  // Match Preferred
  profile.preferredSkills.forEach(skill => {
    if (userSkills.some(us => us.includes(skill.toLowerCase()) || skill.toLowerCase().includes(us))) {
      commonSkills.push(skill);
    } else {
      missingPreferred.push(skill);
    }
  });

  // Unique to resume
  const allRoleSkills = [...profile.requiredSkills, ...profile.preferredSkills, ...profile.optionalSkills].map(s => s.toLowerCase());
  userSkills.forEach(us => {
    if (!allRoleSkills.some(rs => rs.includes(us) || us.includes(rs))) {
      uniqueResumeSkills.push(us);
    }
  });

  // Scoring Logic
  let score = 0;
  const requiredWeight = 15;
  const preferredWeight = 5;

  const totalPossibleScore = (profile.requiredSkills.length * requiredWeight) + (profile.preferredSkills.length * preferredWeight);
  
  profile.requiredSkills.forEach(skill => {
    if (commonSkills.includes(skill)) score += requiredWeight;
  });
  
  profile.preferredSkills.forEach(skill => {
    if (commonSkills.includes(skill)) score += preferredWeight;
  });

  let compatibilityScore = Math.round((score / totalPossibleScore) * 100);
  
  // Apply a small bump based on industry weightage if they have a decent base score
  if (compatibilityScore > 50) {
    compatibilityScore = Math.min(100, Math.round(compatibilityScore * (1 + ((profile.industryWeightage - 1) * 0.1))));
  }

  let matchLevel: RoleMatchResult['matchLevel'] = 'Low Match';
  if (compatibilityScore >= 80) matchLevel = 'Excellent Match';
  else if (compatibilityScore >= 60) matchLevel = 'Good Match';
  else if (compatibilityScore >= 40) matchLevel = 'Needs Improvement';

  return {
    role: profile,
    compatibilityScore,
    matchLevel,
    commonSkills,
    missingRequired,
    missingPreferred,
    uniqueResumeSkills
  };
}

export function evaluateAllRoles(parsedData: StructuredResumeData): RoleMatchResult[] {
  return roleProfilesDB
    .map(profile => calculateRoleMatch(parsedData, profile))
    .sort((a, b) => b.compatibilityScore - a.compatibilityScore);
}

// 3. Comparison Engine
export function compareRoles(roleAId: string, roleBId: string, parsedData: StructuredResumeData): ComparisonResult | null {
  const profileA = roleProfilesDB.find(r => r.name === roleAId);
  const profileB = roleProfilesDB.find(r => r.name === roleBId);

  if (!profileA || !profileB) return null;

  const resultA = calculateRoleMatch(parsedData, profileA);
  const resultB = calculateRoleMatch(parsedData, profileB);

  const allA = [...profileA.requiredSkills, ...profileA.preferredSkills];
  const allB = [...profileB.requiredSkills, ...profileB.preferredSkills];

  const commonBetweenRoles = allA.filter(s => allB.includes(s));
  const uniqueToA = allA.filter(s => !allB.includes(s));
  const uniqueToB = allB.filter(s => !allA.includes(s));

  return {
    roleA: resultA,
    roleB: resultB,
    commonBetweenRoles,
    uniqueToA,
    uniqueToB
  };
}

// 4. Career Recommendation Service
export function getCareerRecommendation(rankings: RoleMatchResult[]) {
  if (rankings.length === 0) return null;
  
  const bestMatch = rankings[0];
  const timeEstimate = bestMatch.missingRequired.length * 2 + bestMatch.missingPreferred.length; // rough estimate in weeks

  return {
    bestMatch,
    reasoning: `Based on your resume, you have ${bestMatch.commonSkills.length} highly relevant skills mapping perfectly to the ${bestMatch.role.name} profile.`,
    timeToReady: `${timeEstimate}-${timeEstimate + 2} Weeks`
  };
}
