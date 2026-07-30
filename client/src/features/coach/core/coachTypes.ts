export interface CoachingCardData {
  type: 'opportunity' | 'warning' | 'motivation';
  title: string;
  message: string;
}

export interface CareerInsight {
  id: string;
  category: 'performance' | 'resume' | 'consistency' | 'focus';
  message: string;
}

export interface ActionPlanItem {
  id: string;
  title: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  reason: string;
  estimatedTime: string;
  expectedImpact: string;
  deepLink: string;
}

export interface LearningPriority {
  id: string;
  topic: string;
  priorityLevel: 'Highest' | 'Medium' | 'Revision' | 'Mastered';
  progress: number;
  recommendation: string;
  estimatedStudyTime: string;
}

export interface InterviewStrategy {
  recommendedTopic: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  targetCompany: string;
  reason: string;
  estimatedSuccess: number;
}

export interface ResumeAdviceItem {
  id: string;
  advice: string;
  deepLink: string;
}

export interface ApplicationReadinessItem {
  companyName: string;
  status: 'Ready to Apply' | 'Need Preparation' | 'Do Not Apply Yet' | 'Upload Resume to Unlock' | 'Create Profile First';
}

export interface WeeklyGoal {
  id: string;
  title: string;
  completed: boolean;
}

export interface CareerCoachPayload {
  firstName: string;
  greeting: string;
  overallReadiness: number;
  currentGoal: string;
  targetCompany: string;
  careerPath: string;
  coachingCards: CoachingCardData[];
  insights: CareerInsight[];
  actionPlan: ActionPlanItem[];
  learningPriorities: LearningPriority[];
  interviewStrategy: InterviewStrategy;
  resumeAdvice: ResumeAdviceItem[];
  applicationReadiness: ApplicationReadinessItem[];
  weeklyGoals: WeeklyGoal[];
}
