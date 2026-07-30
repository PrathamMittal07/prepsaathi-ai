import { apiClient } from './client';

export const resumeApi = {
  processResume: async (file: File, targetRole: string, onProgress?: (progress: number) => void) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('targetRole', targetRole);
    // Note: client.ts uses fetch, we'll just use postForm.
    const response = await apiClient.postForm('/resumes/process', formData);
    return response.data;
  },

  listMyResumes: async () => {
    const response = await apiClient.get('/resumes');
    return response.data;
  },

  getResume: async (id: string) => {
    const response = await apiClient.get(`/resumes/${id}`);
    return response.data;
  },

  deleteResume: async (id: string) => {
    const response = await apiClient.delete(`/resumes/${id}`);
    return response;
  },

  analyzeResume: async (id: string, targetRole: string) => {
    const response = await apiClient.post(`/resumes/${id}/analyze`, { targetRole });
    return response.data;
  },

  matchWithJD: async (id: string, jobDescription: string) => {
    const response = await apiClient.post(`/resumes/${id}/match`, { jobDescription });
    return response.data;
  },

  getMatchHistory: async (id: string) => {
    const response = await apiClient.get(`/resumes/${id}/matches`);
    return response.data;
  }
};
