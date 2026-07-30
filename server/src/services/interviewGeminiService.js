const { GoogleGenAI } = require('@google/genai');
const crypto = require('crypto');
const { buildInterviewEvaluationPrompt } = require('../prompts/interviewEvaluation.prompt');
const { interviewEvaluationSchema } = require('../validators/interviewEvaluation.schema');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Simple in-memory cache for demo/MVP purposes
const evaluationCache = new Map();

function generateCacheKey(context) {
  // Hash the critical inputs that determine the evaluation
  const hashString = JSON.stringify({
    role: context.role,
    questions: context.questions?.map(q => q.title),
    userAnswers: context.userAnswers
  });
  return crypto.createHash('sha256').update(hashString).digest('hex');
}

async function evaluateInterviewWithGemini(context, retryCount = 0) {
  const cacheKey = generateCacheKey(context);
  
  if (evaluationCache.has(cacheKey)) {
    console.log('Returning cached evaluation for interview');
    return evaluationCache.get(cacheKey);
  }

  const prompt = buildInterviewEvaluationPrompt(context);

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: prompt,
      config: {
        temperature: 0.2, // Low temperature for consistent JSON
        responseMimeType: 'application/json'
      }
    });

    const text = response.text();
    let parsedJson;
    
    try {
      parsedJson = JSON.parse(text);
    } catch (parseError) {
      console.error('Failed to parse Gemini response as JSON', text);
      throw new Error('Invalid JSON format from Gemini');
    }

    // Validate using Zod
    const validationResult = interviewEvaluationSchema.safeParse(parsedJson);

    if (!validationResult.success) {
      console.error('Zod Validation Failed:', validationResult.error);
      throw new Error('Validation failed against strict schema');
    }

    const finalEvaluation = validationResult.data;
    
    // Add metadata as requested
    finalEvaluation.metadata = {
      modelName: 'gemini-2.5-pro',
      executionTime: new Date().toISOString(),
      promptHash: cacheKey
    };

    // Store in cache
    evaluationCache.set(cacheKey, finalEvaluation);
    
    return finalEvaluation;

  } catch (error) {
    if (retryCount < 1) {
      console.log(`Gemini evaluation failed. Retrying... (${error.message})`);
      return evaluateInterviewWithGemini(context, retryCount + 1);
    }
    
    console.error('Gemini evaluation failed permanently after retries:', error);
    throw error;
  }
}

module.exports = { evaluateInterviewWithGemini };
