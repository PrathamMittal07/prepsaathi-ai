function buildInterviewEvaluationPrompt(context) {
  const {
    role,
    company,
    round,
    difficulty,
    duration,
    questions,
    userAnswers,
    skippedQuestions,
    completionTime,
    resumeSummary,
    skillGapSummary,
    roadmapProgress
  } = context;

  const prompt = `
You are an expert Senior Software Engineering Interviewer and AI Evaluator. 
Your task is to evaluate a candidate's mock interview performance. 

INTERVIEW CONTEXT:
- Role: ${role}
- Company Tier/Type: ${company}
- Interview Round: ${round}
- Difficulty: ${difficulty}
- Target Duration: ${duration} minutes
- Actual Completion Time: ${completionTime || 'Unknown'}

CANDIDATE BACKGROUND (If available):
- Resume Summary: ${resumeSummary || 'Not provided'}
- Known Skill Gaps: ${skillGapSummary || 'Not provided'}
- Current Roadmap Progress: ${roadmapProgress || 'Not provided'}

INTERVIEW TRANSCRIPT:
${questions.map((q, i) => `
QUESTION ${i + 1}:
Title: ${q.title}
Difficulty: ${q.difficulty}
Category: ${q.category}
Description: ${q.description}

CANDIDATE ANSWER:
${skippedQuestions.includes(i) ? '[SKIPPED]' : (userAnswers[i] || '[NO ANSWER PROVIDED]')}
`).join('\n')}

INSTRUCTIONS:
Evaluate the candidate's performance across all questions based on the role and difficulty.
You MUST respond with a valid JSON object matching the provided strict schema.
No markdown wrappers like \`\`\`json, just the raw JSON string.

The JSON object MUST contain the following structure exactly as defined:

{
  "overallScore": <number 0-100>,
  "communication": <number 0-100>,
  "technicalKnowledge": <number 0-100>,
  "problemSolving": <number 0-100>,
  "confidence": <number 0-100>,
  "timeManagement": <number 0-100>,
  "executiveSummary": "<string: A professional summary similar to feedback from a Senior Software Engineer.>",
  "strengths": ["<string>", ...],
  "weaknesses": ["<string>", ...],
  "questionAnalysis": [
    {
      "id": "<string: matches question ID>",
      "question": "<string>",
      "userAnswer": "<string>",
      "idealAnswer": "<string>",
      "technicalScore": <number 0-100>,
      "communicationScore": <number 0-100>,
      "confidenceScore": <number 0-100>,
      "improvementSuggestions": ["<string>", ...],
      "interviewerFeedback": "<string>",
      "knowledgeGaps": ["<string>", ...],
      "difficultyAssessment": "<string>"
    }
  ],
  "recommendedTopics": ["<string>", ...],
  "learningPlan": [
    {
      "id": "<string>",
      "topic": "<string>",
      "priority": "<High|Medium|Low>",
      "estimatedTime": "<string>",
      "difficulty": "<Beginner|Intermediate|Advanced>",
      "reason": "<string>"
    }
  ],
  "idealAnswers": ["<string>", ...],
  "interviewerFeedback": {
    "impressedMe": "<string>",
    "needsImprovement": "<string>",
    "whatIWouldAskNext": "<string>",
    "hiringRecommendation": "<string>"
  },
  "careerReadiness": {
    "interviewReadinessScore": <number 0-100>,
    "careerReadinessScore": <number 0-100>,
    "recommendedCompanyTier": "<string>",
    "suitableRoles": ["<string>", ...]
  },
  "nextInterviewDifficulty": "<string>",
  "followUpInterview": <boolean>,
  "confidenceLevel": {
    "score": <number 0-100>,
    "reason": "<string>"
  }
}

Ensure all analysis is deeply personalized to the exact answers provided. If a question was skipped or not answered, evaluate accordingly with low scores and specific improvement suggestions.
`;

  return prompt;
}

module.exports = { buildInterviewEvaluationPrompt };
