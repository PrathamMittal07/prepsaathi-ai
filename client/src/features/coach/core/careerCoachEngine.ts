// mock
import { CareerCoachPayload, ActionPlanItem, CareerInsight, CoachingCardData, LearningPriority, InterviewStrategy, ResumeAdviceItem, ApplicationReadinessItem, WeeklyGoal } from './coachTypes';

export function formatCoachPayload(
  user: any,
  careerProfile: any,
  analysis: any,
  activeResume: any
): CareerCoachPayload {
  const firstName = user?.profile?.firstName || '';
  
  // Base fallbacks
  let greeting = firstName ? `Good Morning, ${firstName} 👋` : 'Good Morning 👋';
  let overallReadiness = careerProfile?.careerReadiness || 0;
  let targetCompany = careerProfile?.targetCompanyType || 'Top Tech Companies';
  let careerPath = careerProfile?.targetRole || 'Software Engineer';
  let currentGoal = careerProfile?.currentLearningFocus || 'Onboarding & Profile Setup';

  const actionPlan: ActionPlanItem[] = [];
  const insights: CareerInsight[] = [];
  const coachingCards: CoachingCardData[] = [];
  const learningPriorities: LearningPriority[] = [];
  const resumeAdvice: ResumeAdviceItem[] = [];
  const applicationReadiness: ApplicationReadinessItem[] = [];
  const weeklyGoals: WeeklyGoal[] = [];

  // Generate Action Plan & Resume Advice
  if (!activeResume) {
    actionPlan.push({
      id: 'a-resume',
      title: 'Upload your first resume',
      priority: 'Critical',
      reason: 'AI needs your resume to generate tailored recommendations.',
      estimatedTime: '5 mins',
      expectedImpact: 'Very High',
      deepLink: '/dashboard/resume'
    });
    resumeAdvice.push({
      id: 'r-upload',
      advice: 'Upload your resume to receive detailed AI feedback and ATS scores.',
      deepLink: '/dashboard/resume'
    });
    coachingCards.push({
      type: 'warning',
      title: 'Missing Resume',
      message: 'Upload your resume to unlock personalized career insights and job matching.'
    });
  } else {
    const atsScore = careerProfile?.atsScore || 0;
    if (atsScore < 80) {
      actionPlan.push({
        id: 'a-ats',
        title: `Improve ATS score from ${atsScore} → 85`,
        priority: 'High',
        reason: 'A higher ATS score increases interview callbacks.',
        estimatedTime: '20 mins',
        expectedImpact: 'High',
        deepLink: '/dashboard/resume'
      });
      resumeAdvice.push({
        id: 'r-ats',
        advice: `Your ATS score is ${atsScore}%. Add more quantifiable achievements to improve it.`,
        deepLink: '/dashboard/resume'
      });
    } else {
      resumeAdvice.push({
        id: 'r-good',
        advice: `Great job! Your ATS score is ${atsScore}%. Keep tailoring it for specific roles.`,
        deepLink: '/dashboard/resume'
      });
    }

    if (analysis && analysis.matchScore) {
      applicationReadiness.push({
        companyName: targetCompany,
        status: analysis.matchScore > 80 ? 'Ready to Apply' : 'Need Preparation'
      });
    } else {
      applicationReadiness.push({
        companyName: 'Your Target Roles',
        status: 'Upload Resume to Unlock'
      });
    }
  }

  if (applicationReadiness.length === 0) {
    applicationReadiness.push({
      companyName: 'Get Started',
      status: 'Create Profile First'
    });
  }

  // Generate Learning Priorities & Insights
  if (!careerProfile || !careerProfile.strongSkills || careerProfile.strongSkills.length === 0) {
    actionPlan.push({
      id: 'a-profile',
      title: 'Complete Career Profile',
      priority: 'High',
      reason: 'Help us understand your skills to build a customized roadmap.',
      estimatedTime: '10 mins',
      expectedImpact: 'High',
      deepLink: '/dashboard/settings/profile'
    });
  } else {
    careerProfile.strongSkills.slice(0, 2).forEach((skill: string, i: number) => {
      insights.push({
        id: `i-s-${i}`,
        category: 'performance',
        message: `Strong foundation in ${skill} gives you a competitive edge.`
      });
    });

    careerProfile.weakSkills.slice(0, 2).forEach((skill: string, i: number) => {
      insights.push({
        id: `i-w-${i}`,
        category: 'consistency',
        message: `Focus on improving ${skill} to increase interview pass rates.`
      });
      learningPriorities.push({
        id: `l-w-${i}`,
        topic: skill,
        priorityLevel: 'Highest',
        progress: 0,
        recommendation: `Start the ${skill} fundamentals module.`,
        estimatedStudyTime: '2 hours'
      });
    });

    if (careerProfile.currentLearningFocus) {
      learningPriorities.push({
        id: `l-focus`,
        topic: careerProfile.currentLearningFocus,
        priorityLevel: 'Medium',
        progress: careerProfile.roadmapProgress || 0,
        recommendation: `Continue your progress in ${careerProfile.currentLearningFocus}.`,
        estimatedStudyTime: '45 mins'
      });
    }
  }

  if (learningPriorities.length === 0) {
    learningPriorities.push({
      id: 'l-default',
      topic: 'Career Roadmap setup',
      priorityLevel: 'Highest',
      progress: 0,
      recommendation: 'Create your profile to get AI-driven learning goals.',
      estimatedStudyTime: '10 mins'
    });
  }

  // Generate Coaching Cards
  if (careerProfile?.roadmapProgress > 0) {
    coachingCards.push({
      type: 'motivation',
      title: 'Roadmap Progress',
      message: `You've completed ${careerProfile.roadmapProgress}% of your career roadmap. Keep it up!`
    });
  }

  // Interview Strategy
  let interviewStrategy: InterviewStrategy = {
    recommendedTopic: 'General Fundamentals',
    difficulty: 'Easy',
    targetCompany: targetCompany,
    reason: 'Start with basics to build your confidence before tackling advanced topics.',
    estimatedSuccess: careerProfile?.interviewReadiness || 30
  };

  if (careerProfile && careerProfile.targetRole) {
    interviewStrategy = {
      recommendedTopic: careerProfile.currentLearningFocus || careerProfile.targetRole + ' Concepts',
      difficulty: careerProfile.interviewReadiness > 70 ? 'Hard' : 'Medium',
      targetCompany: targetCompany,
      reason: `Based on your target role (${careerProfile.targetRole}), this is a highly tested area.`,
      estimatedSuccess: careerProfile.interviewReadiness || 50
    };
  }

  // Weekly Goals (fallback)
  if (careerProfile?.dailyMissions?.length > 0) {
    careerProfile.dailyMissions.forEach((m: any) => {
      weeklyGoals.push({
        id: m.id,
        title: m.title,
        completed: m.status === 'completed'
      });
    });
  } else {
    weeklyGoals.push({ id: 'w1', title: 'Complete your first mock interview', completed: false });
    weeklyGoals.push({ id: 'w2', title: 'Apply to 3 roles in your target sector', completed: false });
    weeklyGoals.push({ id: 'w3', title: 'Update your LinkedIn profile', completed: false });
  }

  // Populate some generic insights if still empty so the dashboard doesn't look broken
  if (insights.length === 0) {
    insights.push({
      id: 'i-default',
      category: 'focus',
      message: 'Complete your profile and upload a resume to unlock AI insights.'
    });
  }

  return {
    firstName,
    greeting,
    overallReadiness,
    currentGoal,
    targetCompany,
    careerPath,
    coachingCards,
    insights,
    actionPlan,
    learningPriorities,
    interviewStrategy,
    resumeAdvice,
    applicationReadiness,
    weeklyGoals
  };
}

export function createEmptyCoach(): CareerCoachPayload {
  return formatCoachPayload(null, null, null, null);
}
