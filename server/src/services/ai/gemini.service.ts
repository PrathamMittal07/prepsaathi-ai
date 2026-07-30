import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export class GeminiService {
  static async analyzeResume(resumeText: string, targetRole: string = 'Software Engineer') {
    const prompt = `
You are an expert ATS (Applicant Tracking System) and Senior Technical Recruiter.
Please analyze the following resume text against the target role: "${targetRole}".

You MUST return ONLY a valid JSON object matching the exact structure below. Do NOT use markdown code blocks (like \`\`\`json). Return raw JSON only.

Structure:
{
  "atsScore": number (0-100),
  "summary": "Brief overall evaluation",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "missingSkills": ["Skill 1", "Skill 2"],
  "suggestions": ["Actionable advice 1", "Actionable advice 2"]
}

Resume Text:
${resumeText.substring(0, 10000)}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.2 }
      });
      
      const responseText = response.text || '';
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error: any) {
      console.error('Gemini Analysis Error:', error);
      throw new Error('Failed to analyze resume with AI');
    }
  }

  static async matchResumeWithJD(resumeText: string, jobDescription: string) {
    const prompt = `
You are an expert ATS and Senior Technical Recruiter.
Please match the following resume text against the provided Job Description.

You MUST return ONLY a valid JSON object matching the exact structure below. Do NOT use markdown code blocks (like \`\`\`json). Return raw JSON only.

Structure:
{
  "matchScore": number (0-100),
  "matchingSkills": ["Skill 1", "Skill 2"],
  "missingSkills": ["Skill 1", "Skill 2"],
  "experienceGap": "Detailed string explaining experience gaps",
  "atsSuggestions": ["Suggestion 1", "Suggestion 2"],
  "overallFeedback": "Brief summary of the match"
}

Resume Text:
${resumeText.substring(0, 10000)}

Job Description:
${jobDescription.substring(0, 20000)}
`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: { temperature: 0.2 }
      });
      
      const responseText = response.text || '';
      const cleaned = responseText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(cleaned);
    } catch (error: any) {
      console.error('Gemini Match Error:', error);
      throw new Error('Failed to match resume with JD using AI');
    }
  }

  static async coachChat(message: string, history: any[], userContext: string) {
    const systemPrompt = `
You are a highly supportive, knowledgeable, and professional placement mentor and AI Career Coach.
Your goal is to help the user with resume improvements, interview preparation, career advice, and learning roadmaps.

USER CONTEXT (Use this to personalize your advice, DO NOT FABRICATE DATA):
${userContext}

Guidelines:
- If the user asks about their resume and it is not uploaded, politely tell them they need to upload it on the Resume page.
- Keep responses concise, well-formatted using Markdown (bullet points, bold text).
- Be encouraging and actionable.
- Do not mention that you are an AI unless explicitly asked.
`;

    // Format history for Gemini
    const contents = history.map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));

    // Add current message
    contents.push({
      role: 'user',
      parts: [{ text: message }]
    });

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents,
        config: { 
          temperature: 0.7,
          systemInstruction: systemPrompt
        }
      });
      
      return response.text || "I'm sorry, I couldn't generate a response at this time.";
    } catch (error: any) {
      console.error('Gemini Coach Chat Error:', error);
      throw new Error('Failed to get response from AI Coach');
    }
  }
}
