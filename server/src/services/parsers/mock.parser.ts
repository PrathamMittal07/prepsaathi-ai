import { IResumeParser, ParseResult } from './parser.interface';

export class MockParser implements IResumeParser {
  async parse(fileBuffer: Buffer, mimeType: string): Promise<ParseResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    return {
      provider: 'mock-parser',
      rawText: 'Mock extracted resume text...',
      structuredData: {
        personalInfo: { name: 'John Doe', email: 'john@demo.com' },
        education: [{ institution: 'MIT', degree: 'BS Computer Science' }],
        workExperience: [{ company: 'Google', title: 'Software Engineer' }],
        skills: ['JavaScript', 'TypeScript', 'Node.js']
      },
      confidenceScore: 0.95,
      missingSections: ['Certifications', 'Languages'],
      formattingIssues: ['Inconsistent dates'],
      sectionCompleteness: {
        personalInfo: 100,
        education: 80,
        workExperience: 90
      },
      keywordDensity: {
        'Software': 5,
        'Engineer': 3
      },
      experienceSummary: 'Experienced software engineer focused on backend development.',
      educationSummary: 'Computer Science graduate from a top-tier university.'
    };
  }
}
