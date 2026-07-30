import axios from 'axios';
import { ResumeUploadRecord } from '../types';

const API_URL = 'http://localhost:5000/api/resume';

export const uploadResumeFile = async (
  file: File, 
  onProgress?: (progress: number) => void
): Promise<ResumeUploadRecord> => {
  const formData = new FormData();
  formData.append('resume', file);
  formData.append('userId', 'user-123'); // Mock user for now

  try {
    const response = await axios.post(`${API_URL}/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-user-id': 'user-123'
      },
      onUploadProgress: (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (onProgress) onProgress(progress);
        }
      }
    });

    return response.data.data;
  } catch (error: any) {
    console.error('Error uploading resume:', error);
    if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
      throw new Error('Network timeout. Please check your connection and try again.');
    }
    if (!error.response) {
      throw new Error('Network error. The server might be unreachable.');
    }
    throw new Error(error.response.data?.message || 'Failed to upload resume.');
  }
};

export const fetchResumeHistory = async (userId: string = 'user-123'): Promise<ResumeUploadRecord[]> => {
  try {
    const response = await axios.get(`${API_URL}/history/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching resume history:', error);
    return [];
  }
};

export const removeResumeFile = async (id: string): Promise<boolean> => {
  try {
    await axios.delete(`${API_URL}/${id}`);
    return true;
  } catch (error) {
    console.error('Error removing resume:', error);
    return false;
  }
};

export const fetchParsingStatus = async (id: string, retries = 3): Promise<Pick<ResumeUploadRecord, 'parsingStatus' | 'parsingError' | 'parsedData' | 'aiAnalysisData'> | null> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(`${API_URL}/status/${id}`);
      return response.data.data;
    } catch (error: any) {
      console.warn(`Error fetching parsing status (attempt ${i + 1}/${retries}):`, error);
      if (i === retries - 1) {
        return null;
      }
      // Wait before retrying (exponential backoff)
      await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, i)));
    }
  }
  return null;
};

export const analyzeResumeWithAI = async (parsedData: any, targetRole: string, targetCompany?: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/analyze-ai`, {
      parsedData,
      targetRole,
      targetCompany
    });
    return response.data;
  } catch (error) {
    console.error('Error calling AI analysis:', error);
    return { success: false, isFallback: true, error: 'Network error or AI unavailable' };
  }
};
