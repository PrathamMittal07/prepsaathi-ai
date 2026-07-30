export interface ParsedResumeSection {
  personalInfo?: any;
  education?: any[];
  workExperience?: any[];
  projects?: any[];
  skills?: any[];
  certifications?: any[];
  achievements?: any[];
  languages?: any[];
  socialLinks?: any;
}

export interface ParseResult {
  provider: string;
  rawText: string;
  structuredData: ParsedResumeSection;
  confidenceScore: number;
  missingSections: string[];
  formattingIssues: string[];
  sectionCompleteness: Record<string, number>;
  keywordDensity: Record<string, number>;
  experienceSummary: string;
  educationSummary: string;
}

export interface IResumeParser {
  parse(fileBuffer: Buffer, mimeType: string): Promise<ParseResult>;
}
