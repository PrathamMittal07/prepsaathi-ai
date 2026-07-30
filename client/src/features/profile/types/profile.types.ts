export interface ReadinessBreakdown {
  label: string;
  score: number;
  color: string;
}

export interface DailyMission {
  id: string;
  title: string;
  estimatedTime: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'pending' | 'completed';
  actionLink: string;
}

export interface Insight {
  id: string;
  type: 'strength' | 'weakness' | 'improvement' | 'action';
  message: string;
  color: string;
}

export interface QuickContinue {
  id: string;
  title: string;
  lastActivity: string;
  progress: number;
  link: string;
}

export interface ActivityTimelineEvent {
  id: string;
  event: string;
  time: string;
  type: 'resume' | 'roadmap' | 'interview' | 'learning' | 'system';
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  unlocked: boolean;
}

export interface Recommendation {
  id: string;
  title: string;
  detail: string;
  impact: string;
  link: string;
}

export interface UserProfile {
  id: string;
  name: string;
  targetRole: string;
  targetCompanyType: string;
  
  // Core Scores
  resumeScore: number;
  atsScore: number;
  interviewReadiness: number;
  roadmapProgress: number;
  careerReadiness: number; // The overarching score
  learningStreak: number;

  historicalStats: {
    dates: string[];
    resumeScores: number[];
    interviewScores: number[];
  };

  // Technical Profile
  strongSkills: string[];
  weakSkills: string[];
  currentLearningFocus: string;

  // Granular Breakdown
  readinessBreakdown: ReadinessBreakdown[];

  // Dynamic Content (Aggregated by AI or driven by events)
  dailyMissions: DailyMission[];
  insights: Insight[];
  quickContinue: QuickContinue[];
  activityTimeline: ActivityTimelineEvent[];
  achievements: Achievement[];
  recommendations: Recommendation[];
}
