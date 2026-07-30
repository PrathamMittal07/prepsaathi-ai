const { evaluateInterviewWithGemini } = require('../services/interviewGeminiService');

const evaluateInterview = async (req, res) => {
  try {
    const interviewContext = req.body;
    
    // Attempt AI evaluation
    const evaluation = await evaluateInterviewWithGemini(interviewContext);
    
    return res.status(200).json({
      success: true,
      source: 'gemini',
      data: evaluation
    });
    
  } catch (error) {
    console.error('Interview evaluation failed, falling back to mock UI handling.', error);
    
    // We return a 500 or 503 here, and let the frontend gracefully fall back to mock data
    // The ticket says "Gracefully fall back to mock evaluation... Display 'AI evaluation temporarily unavailable. Showing standard interview analysis.'"
    return res.status(503).json({
      success: false,
      message: 'AI evaluation temporarily unavailable. Please use mock fallback.',
      error: error.message
    });
  }
};

module.exports = {
  evaluateInterview
};
