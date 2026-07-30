const { GoogleGenAI } = require('@google/genai');

async function analyzeResumeWithAI(parsedData, targetRole, targetCompany) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is missing in environment variables');
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  const prompt = `You are a strict, senior technical recruiter and hiring manager at a top-tier tech company.
Analyze the following parsed resume data for the role of ${targetRole || 'Software Engineer'}${targetCompany ? ` at ${targetCompany}` : ''}.

Resume Data:
${JSON.stringify(parsedData, null, 2)}

Provide a highly detailed, professional analysis of this resume. 
You must respond with ONLY a valid JSON object.

The JSON object MUST EXACTLY match this structure (return ONLY this JSON):
{
  "scores": {
    "overall": <number 0-100, the final average score>,
    "ats": <number 0-100, score based on keywords and parsability>,
    "roleMatch": <number 0-100, how well skills/projects align with the role>,
    "readiness": <number 0-100, interview and industry readiness>,
    "completeness": <number 0-100, structural completeness>
  },
  "sectionHealth": [
    {
      "name": "Personal Information",
      "score": <number 0-100>,
      "status": "<one of: Critical, Needs Work, Good, Excellent>",
      "details": ["<specific feedback point 1>", "<specific feedback point 2>"]
    },
    {
      "name": "Skills",
      "score": <number 0-100>,
      "status": "<one of: Critical, Needs Work, Good, Excellent>",
      "details": ["<feedback>"]
    },
    {
      "name": "Experience",
      "score": <number 0-100>,
      "status": "<one of: Critical, Needs Work, Good, Excellent>",
      "details": ["<feedback>"]
    },
    {
      "name": "Projects",
      "score": <number 0-100>,
      "status": "<one of: Critical, Needs Work, Good, Excellent>",
      "details": ["<feedback>"]
    },
    {
      "name": "Education",
      "score": <number 0-100>,
      "status": "<one of: Critical, Needs Work, Good, Excellent>",
      "details": ["<feedback>"]
    }
  ],
  "summary": "<A 3-4 sentence executive summary of the candidate's profile>",
  "strengths": [
    { "title": "<e.g. Strong Architecture Skills>", "description": "<explanation>" },
    { "title": "<...>", "description": "<...>" }
  ],
  "opportunities": [
    { "title": "<e.g. Missing Impact Metrics>", "description": "<explanation>" },
    { "title": "<...>", "description": "<...>" }
  ],
  "sectionFeedback": {
    "projects": "<Detailed AI feedback on their projects section>",
    "experience": "<Detailed AI feedback on their work experience>",
    "skills": "<Detailed AI feedback on their skills section>",
    "education": "<Detailed AI feedback on their education section>",
    "summary": "<Detailed AI feedback on their objective/summary>"
  },
  "missingSections": ["<e.g. Certifications, Open Source, Portfolio link>"],
  "topRecommendations": ["<Actionable tip 1>", "<Actionable tip 2>"]
}
`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
    config: {
        temperature: 0.7,
        responseMimeType: "application/json"
    }
  });

  const responseText = response.text;
  try {
    const jsonStr = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
    return JSON.parse(jsonStr);
  } catch (err) {
    console.error("Failed to parse Gemini response as JSON:", responseText);
    throw new Error("Invalid AI response format");
  }
}

module.exports = {
  analyzeResumeWithAI
};
