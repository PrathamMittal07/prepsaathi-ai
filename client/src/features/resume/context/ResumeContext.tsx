'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { resumeApi } from '@/lib/api/resume';

export type WorkflowState = 'IDLE' | 'FILE_SELECTED' | 'VALIDATING' | 'UPLOADING' | 'UPLOAD_COMPLETE' | 'READY_FOR_ANALYSIS' | 'ANALYZING' | 'ANALYSIS_COMPLETE' | 'ERROR';

interface ResumeContextType {
  analysis?: any;
  activeResume: any | null;
  history: any[];
  
  workflowState: WorkflowState;
  
  uploadProgress: number;
  error: string | null;
  
  uploadResume: (file: File) => Promise<void>;
  removeResume: (id: string) => Promise<void>;
  clearError: () => void;
  
  targetRole: string;
  setTargetRole: (role: string) => void;
  
  finishProcessing: () => Promise<void>;
  startAnalysis: (id: string) => Promise<void>;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeResume, setActiveResume] = useState<any | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  const [workflowState, setWorkflowState] = useState<WorkflowState>('IDLE');
  
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [targetRole, setTargetRole] = useState('Software Engineer');
  const [analysis, setAnalysis] = useState<any>(null);

  const loadHistory = async () => {
    try {
      const data = await resumeApi.listMyResumes();
      setHistory(data || []);
      const active = data.find((r: any) => r.isPrimary) || data[0];
      setActiveResume(active || null);
      if (active?.analysis) {
        setAnalysis(active.analysis[0] || active.analysis); // depending on relation
      }
    } catch (e) {
      console.error('Failed to load history', e);
    }
  };

  useEffect(() => {
    loadHistory();
  }, []);

  const validateFile = (file: File): string | null => {
    if (file.size > 10 * 1024 * 1024) {
      return 'File exceeds 10MB limit.';
    }
    const allowedTypes = ['application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return 'Invalid file type. Only PDF allowed.';
    }
    return null;
  };

  const uploadResume = async (file: File) => {
    setWorkflowState('FILE_SELECTED');
    setError(null);
    
    setWorkflowState('VALIDATING');
    const validationError = validateFile(file);
    if (validationError) {
      setWorkflowState('ERROR');
      setError(validationError);
      return;
    }

    setWorkflowState('UPLOADING');
    setUploadProgress(0);

    try {
      const result = await resumeApi.processResume(file, targetRole, (progress) => {
        setUploadProgress(progress);
        if (progress >= 100) {
           setWorkflowState('ANALYZING');
        }
      });
      
      setUploadProgress(0);
      setWorkflowState('ANALYSIS_COMPLETE');
      setActiveResume(result);
      setAnalysis(result.analysis);
      await loadHistory();
    } catch (err: any) {
      setWorkflowState('ERROR');
      setError(err.message || 'An unexpected error occurred during upload or analysis.');
      setUploadProgress(0);
    }
  };

  const removeResume = async (id: string) => {
    try {
       await resumeApi.deleteResume(id);
       await loadHistory();
    } catch (e) {
       setError('Failed to remove resume.');
    }
  };

  const clearError = () => {
    setError(null);
    if (workflowState === 'ERROR') {
      setWorkflowState('IDLE');
    }
  };

  const finishProcessing = async () => {
    setWorkflowState('IDLE');
    await loadHistory();
    setError(null);
  };

  const startAnalysis = async (id: string) => {
    setWorkflowState('ANALYZING');
    try {
      const result = await resumeApi.analyzeResume(id, targetRole);
      setAnalysis(result);
      setWorkflowState('ANALYSIS_COMPLETE');
      await loadHistory();
    } catch (err: any) {
      setWorkflowState('ERROR');
      setError(err.message || 'Failed to analyze resume.');
    }
  };

  return (
    <ResumeContext.Provider value={{ 
      activeResume, history, workflowState, uploadProgress, error, uploadResume, removeResume, clearError,
      targetRole, setTargetRole, finishProcessing, startAnalysis, analysis
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (context === undefined) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
