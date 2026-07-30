export interface ResumeUploadRecord {
  _id: string;
  userId: string;
  originalName: string;
  fileName: string;
  mimeType: string;
  size: number;
  uploadDate: string;
  version: number;
  isActive: boolean;
  parsingStatus: 'Pending' | 'Extracting' | 'Parsing' | 'Completed' | 'Failed';
  parsingError: string | null;
  parsedData: StructuredResumeData | null;
  aiAnalysisData: any | null;
}

export interface StructuredResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    linkedin: string;
    github: string;
    portfolio: string;
  };
  education: Education[];
  skills: string[];
  experience: Experience[];
  projects: Project[];
  certifications: string[];
  achievements: string[];
}

export interface Education {
  institution: string;
  degree: string;
  year: string;
}

export interface Experience {
  rawBlock: string;
}

export interface Project {
  rawBlock: string;
}
