import { apiClient } from './client';

export const careerApi = {
  getCareerProfile: async () => {
    const response = await apiClient.get('/career/profile');
    return response.data;
  },

  updateCareerProfile: async (data: any) => {
    const response = await apiClient.put('/career/profile', data);
    return response.data;
  },

  chatWithCoach: async (message: string, history: any[] = []) => {
    const response = await apiClient.post('/career/coach/chat', { message, history });
    return response.data;
  }
};
