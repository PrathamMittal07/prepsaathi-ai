import { StructuredResumeData } from '../types';

export interface MissingSkill {
  skill: string;
  priority: 'High' | 'Medium' | 'Low';
  reason: string;
}

export interface SkillGapIntelligence {
  strongSkills: string[];
  missingSkills: MissingSkill[];
  recommendedLearningPath: MissingSkill[];
  resumeReadiness: number;
  roadmapReadiness: number;
  combinedReadiness: number;
}

// 1. Role Profile Service (Mock)
const roleProfiles: Record<string, string[]> = {
  'Software Engineer': ['Java', 'Python', 'React', 'Node.js', 'SQL', 'Docker', 'AWS', 'Git', 'Data Structures', 'System Design'],
  'Backend Engineer': ['Java', 'Spring Boot', 'Node.js', 'Express', 'SQL', 'MongoDB', 'Docker', 'Kubernetes', 'Redis', 'Microservices'],
  'Frontend Engineer': ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Redux', 'HTML', 'CSS', 'JavaScript', 'Jest'],
  'Data Analyst': ['Python', 'SQL', 'Pandas', 'Excel', 'Tableau', 'PowerBI', 'Statistics']
};

// Default profile if none matches
const defaultProfile = roleProfiles['Software Engineer'];

// 2. Priority Engine
const getPriority = (skill: string, index: number, totalRequired: number): 'High' | 'Medium' | 'Low' => {
  // Mock logic: earlier skills in the profile array are more fundamental/critical
  if (index < totalRequired * 0.4) return 'High';
  if (index < totalRequired * 0.7) return 'Medium';
  return 'Low';
};

const getReason = (skill: string, priority: string): string => {
  if (priority === 'High') return `Core requirement for this role. Highly requested by employers.`;
  if (priority === 'Medium') return `Standard expectation for modern stacks.`;
  return `Good to have for competitive advantage.`;
};

// 3. Skill Gap Analyzer
export function generateSkillGapIntelligence(
  parsedData: StructuredResumeData, 
  targetRole: string = 'Software Engineer'
): SkillGapIntelligence {
  
  const requiredSkills = roleProfiles[targetRole] || defaultProfile;
  const userSkills = parsedData.skills.map(s => s.toLowerCase().trim());
  
  const strongSkills: string[] = [];
  const missingSkills: MissingSkill[] = [];

  requiredSkills.forEach((reqSkill, idx) => {
    const isFound = userSkills.some(us => us.includes(reqSkill.toLowerCase()) || reqSkill.toLowerCase().includes(us));
    if (isFound) {
      strongSkills.push(reqSkill);
    } else {
      const priority = getPriority(reqSkill, idx, requiredSkills.length);
      missingSkills.push({
        skill: reqSkill,
        priority,
        reason: getReason(reqSkill, priority)
      });
    }
  });

  // 4. Recommendation Engine (Sorting missing skills by priority for the learning path)
  const priorityWeight = { 'High': 3, 'Medium': 2, 'Low': 1 };
  const recommendedLearningPath = [...missingSkills].sort((a, b) => priorityWeight[b.priority] - priorityWeight[a.priority]);

  // 5. Readiness Calculator
  const resumeReadiness = Math.round((strongSkills.length / requiredSkills.length) * 100);
  // Roadmap Readiness simulates how much the user has progressed on the app (mocking 15% here for realism)
  const roadmapReadiness = 15; 
  const combinedReadiness = Math.min(100, Math.round(resumeReadiness + roadmapReadiness * 0.5));

  return {
    strongSkills,
    missingSkills,
    recommendedLearningPath,
    resumeReadiness,
    roadmapReadiness,
    combinedReadiness
  };
}
