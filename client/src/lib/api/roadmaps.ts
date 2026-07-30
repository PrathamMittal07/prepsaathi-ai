import { apiClient } from './client';

export const roadmapsApi = {
  listMyRoadmaps: async (): Promise<any[]> => {
    const response = await apiClient.get('/roadmaps');
    return response.data;
  },

  getRoadmap: async (id: string): Promise<any> => {
    const response = await apiClient.get(`/roadmaps/${id}`);
    return response.data;
  },

  createRoadmap: async (targetRole: string): Promise<any> => {
    const response = await apiClient.post('/roadmaps', { targetRole });
    return response.data;
  }
};
