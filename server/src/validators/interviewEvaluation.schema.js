const { z } = require('zod');

const interviewEvaluationSchema = z.object({
  overallScore: z.number().min(0).max(100),
  communication: z.number().min(0).max(100),
  technicalKnowledge: z.number().min(0).max(100),
  problemSolving: z.number().min(0).max(100),
  confidence: z.number().min(0).max(100),
  timeManagement: z.number().min(0).max(100),
  
  executiveSummary: z.string(),
  
  strengths: z.array(z.string()),
  
  weaknesses: z.array(z.string()),
  
  questionAnalysis: z.array(z.object({
    id: z.string(),
    question: z.string(),
    userAnswer: z.string(),
    idealAnswer: z.string(),
    technicalScore: z.number().min(0).max(100),
    communicationScore: z.number().min(0).max(100),
    confidenceScore: z.number().min(0).max(100),
    improvementSuggestions: z.array(z.string()),
    interviewerFeedback: z.string(),
    knowledgeGaps: z.array(z.string()),
    difficultyAssessment: z.string()
  })),
  
  recommendedTopics: z.array(z.string()),
  
  learningPlan: z.array(z.object({
    id: z.string(),
    topic: z.string(),
    priority: z.enum(['High', 'Medium', 'Low']),
    estimatedTime: z.string(),
    difficulty: z.enum(['Beginner', 'Intermediate', 'Advanced']),
    reason: z.string()
  })),
  
  idealAnswers: z.array(z.string()),
  
  interviewerFeedback: z.object({
    impressedMe: z.string(),
    needsImprovement: z.string(),
    whatIWouldAskNext: z.string(),
    hiringRecommendation: z.string()
  }),
  
  careerReadiness: z.object({
    interviewReadinessScore: z.number().min(0).max(100),
    careerReadinessScore: z.number().min(0).max(100),
    recommendedCompanyTier: z.string(),
    suitableRoles: z.array(z.string())
  }),
  
  nextInterviewDifficulty: z.string(),
  
  followUpInterview: z.boolean(),
  
  confidenceLevel: z.object({
    score: z.number().min(0).max(100),
    reason: z.string()
  })
});

module.exports = { interviewEvaluationSchema };
