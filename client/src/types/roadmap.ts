export type TopicStatus = 'Not Started' | 'In Progress' | 'Completed';
export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced' | 'Easy' | 'Medium' | 'Hard';

export interface Topic {
  id: string;
  name: string;
  description: string;
  estimatedTime: string;
  difficulty: Difficulty;
  learningObjectives: string[];
  recommendedResources: { title: string; url: string }[];
  practiceProblems: { title: string; url: string; difficulty: Difficulty }[];
  revisionRequired: boolean;
  status: TopicStatus;
  
  // Analytics ready optional fields
  completedAt?: string;
  timeSpent?: number;
  revisionCount?: number;
  confidenceScore?: number;
  lastVisited?: string;
}

export interface Week {
  id: string;
  title: string;
  description?: string;
  topics: Topic[];
}

export interface Roadmap {
  id: string;
  title: string;
  targetCompanies: string[];
  difficulty: Difficulty;
  totalTopics: number;
  totalWeeks: number;
  estimatedCompletionTime: string;
  dailyStudyHours: string;
  expectedInterviewReadiness: string;
  weeks: Week[];
  createdAt: string;
  updatedAt: string;
}

export interface FormData {
  year: string;
  currentLevel: string;
  targetCompanies: string[];
  dailyStudyTime: string;
  preparationDuration: string;
  preferredDifficulty: string;
}

export interface Progress {
  completedTopics: number;
  totalTopics: number;
  percentage: number;
}
