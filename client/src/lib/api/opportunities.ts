import { apiClient } from './client';

export const opportunitiesApi = {
  listOpportunities: async (): Promise<any[]> => {
    const response = await apiClient.get('/opportunities');
    return response.data;
  },

  getOpportunity: async (id: string): Promise<any> => {
    const response = await apiClient.get(`/opportunities/${id}`);
    return response.data;
  }
};
