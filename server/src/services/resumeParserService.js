const fs = require('fs');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');
const ResumeUpload = require('../models/ResumeUpload');
const { analyzeResumeWithAI } = require('./resumeGeminiService');

/**
 * Step 1: Extract Raw Text from PDF or DOCX
 */
async function extractText(filePath, mimeType) {
  let extractedText = '';

  try {
    if (mimeType === 'application/pdf') {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    } else if (
      mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' || 
      mimeType === 'application/msword'
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    } else {
      throw new Error(`Unsupported document format. Please upload a PDF or DOCX file.`);
    }
  } catch (error) {
    console.error('[Text Extraction Failure]:', error.message || error);
    const errorMsg = error.message ? error.message.toLowerCase() : '';

    if (errorMsg.includes('password') || errorMsg.includes('encrypted')) {
      throw new Error('This document is password protected. Please remove the password and try again.');
    }
    if (errorMsg.includes('invalid pdf structure') || errorMsg.includes('corrupt')) {
      throw new Error('The document appears to be corrupted or unreadable. Please save it again and re-upload.');
    }
    
    throw new Error('Failed to read the document. It may be corrupted or unsupported.');
  }

  // Post-extraction validation
  if (!extractedText || extractedText.trim().length < 50) {
    throw new Error('This document appears to be a scanned image or is empty. Please upload a text-based resume.');
  }

  return extractedText;
}

/**
 * Helper to split text into sections based on common headers
 */
function splitIntoSections(text) {
  const sections = {};
  let currentSection = 'summary';
  sections[currentSection] = [];

  const headers = [
    'EDUCATION', 'EXPERIENCE', 'WORK EXPERIENCE', 'EMPLOYMENT', 
    'PROJECTS', 'SKILLS', 'TECHNICAL SKILLS', 'CERTIFICATIONS', 
    'CERTIFICATES', 'ACHIEVEMENTS', 'AWARDS', 'LANGUAGES'
  ];

  const lines = text.split('\n');

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    const upperTrimmed = trimmed.toUpperCase();
    
    // Exact match or matches a known header structure exactly
    const isHeader = headers.some(h => upperTrimmed === h || upperTrimmed === `${h}:`);

    if (isHeader) {
      // Normalize header name
      let headerName = upperTrimmed.replace(':', '');
      if (headerName === 'WORK EXPERIENCE' || headerName === 'EMPLOYMENT') headerName = 'EXPERIENCE';
      if (headerName === 'TECHNICAL SKILLS') headerName = 'SKILLS';
      if (headerName === 'CERTIFICATES') headerName = 'CERTIFICATIONS';
      if (headerName === 'AWARDS') headerName = 'ACHIEVEMENTS';

      currentSection = headerName.toLowerCase();
      sections[currentSection] = [];
    } else {
      sections[currentSection].push(trimmed);
    }
  }

  // Join lines back together for each section
  for (let key in sections) {
    sections[key] = sections[key].join('\n');
  }

  return sections;
}

/**
 * Parsers for individual sections
 */
function parsePersonalData(summaryText) {
  const data = { name: '', email: '', phone: '', linkedin: '', github: '', portfolio: '' };
  if (!summaryText) return data;

  const lines = summaryText.split('\n').filter(Boolean);
  if (lines.length > 0) {
    // Assume first line is name
    data.name = lines[0].trim();
  }

  // Basic regex for email
  const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi;
  const emails = summaryText.match(emailRegex);
  if (emails) data.email = emails[0];

  // Basic regex for phone
  const phoneRegex = /(?:\+?\d{1,3}[\s-]?)?\(?\d{3}\)?[\s-]?\d{3}[\s-]?\d{4}/g;
  const phones = summaryText.match(phoneRegex);
  if (phones) data.phone = phones[0];

  // LinkedIn
  if (summaryText.includes('linkedin.com/in/')) {
    const match = summaryText.match(/linkedin\.com\/in\/[a-zA-Z0-9_-]+/i);
    if (match) data.linkedin = match[0];
  }

  // GitHub
  if (summaryText.includes('github.com/')) {
    const match = summaryText.match(/github\.com\/[a-zA-Z0-9_-]+/i);
    if (match) data.github = match[0];
  }

  return data;
}

function parseEducation(text) {
  if (!text) return [];
  // Dummy heuristic: split by newlines, group in chunks
  const lines = text.split('\n').filter(Boolean);
  const educationList = [];
  let currentEdu = null;

  for (let line of lines) {
    if (line.match(/university|college|institute|school|bachelor|master|bsc|msc|phd/i) && !currentEdu) {
      currentEdu = { institution: line, degree: '', year: '' };
      educationList.push(currentEdu);
    } else if (currentEdu) {
      if (line.match(/\d{4}/)) currentEdu.year = line; // Rough guess for year
      else if (!currentEdu.degree) currentEdu.degree = line;
      else {
        // Reset if we hit another institution
        if (line.match(/university|college|institute/i)) {
          currentEdu = { institution: line, degree: '', year: '' };
          educationList.push(currentEdu);
        }
      }
    }
  }
  return educationList;
}

function parseExperience(text) {
  if (!text) return [];
  // Basic heuristic: lines starting with dates or company names
  return [{ rawBlock: text.substring(0, 500) + (text.length > 500 ? '...' : '') }];
}

function parseProjects(text) {
  if (!text) return [];
  return [{ rawBlock: text.substring(0, 500) + (text.length > 500 ? '...' : '') }];
}

function parseSkills(text) {
  if (!text) return [];
  // Split by comma or bullet points
  const tokens = text.split(/,|•|-|\n/).map(s => s.trim()).filter(s => s.length > 1 && s.length < 30);
  return [...new Set(tokens)]; // Remove duplicates
}

/**
 * Master function to build structured resume
 */
async function buildStructuredResume(uploadId, filePath, mimeType) {
  try {
    // 1. Update status to Extracting
    await ResumeUpload.findByIdAndUpdate(uploadId, { parsingStatus: 'Extracting' });
    
    // Simulate some delay for UI demonstration
    await new Promise(r => setTimeout(r, 1500));

    // 2. Extract raw text
    const rawText = await extractText(filePath, mimeType);

    // 3. Update status to Parsing
    await ResumeUpload.findByIdAndUpdate(uploadId, { rawText, parsingStatus: 'Parsing' });
    
    await new Promise(r => setTimeout(r, 2000));

    // 4. Split and parse sections
    const sections = splitIntoSections(rawText);
    
    const structuredData = {
      personalInfo: parsePersonalData(sections.summary),
      education: parseEducation(sections.education),
      skills: parseSkills(sections.skills),
      experience: parseExperience(sections.experience),
      projects: parseProjects(sections.projects),
      certifications: sections.certifications ? [sections.certifications.substring(0, 100)] : [],
      achievements: sections.achievements ? [sections.achievements.substring(0, 100)] : []
    };

    // 5. Call Gemini AI for Deep Analysis
    let aiAnalysisData = null;
    try {
      // Pass the structured data and a default target role for now
      aiAnalysisData = await analyzeResumeWithAI(structuredData, "Software Engineer");
    } catch (aiError) {
      console.error(`[AI Analysis Failure] Upload ID: ${uploadId}`, aiError.message);
      // We don't fail the entire parsing process if AI fails, we just save null.
    }

    // 6. Save structured data + AI data and complete
    await ResumeUpload.findByIdAndUpdate(uploadId, { 
      parsedData: structuredData,
      aiAnalysisData: aiAnalysisData,
      parsingStatus: 'Completed' 
    });

  } catch (error) {
    console.error(`[Parsing Engine Failure] Upload ID: ${uploadId}`, error.stack || error);
    await ResumeUpload.findByIdAndUpdate(uploadId, { 
      parsingStatus: 'Failed',
      parsingError: error.message || 'Unknown parsing error occurred.'
    });
  } finally {
    // 6. Cleanup the uploaded file to save disk space
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`[File Cleanup] Successfully deleted temporary file: ${filePath}`);
      }
    } catch (cleanupError) {
      console.error(`[File Cleanup Error] Failed to delete ${filePath}:`, cleanupError.message);
    }
  }
}

module.exports = {
  extractText,
  buildStructuredResume
};
