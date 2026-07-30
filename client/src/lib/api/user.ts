import { apiClient } from './client';
import { User } from './types';

export const userApi = {
  updateMyProfile: async (data: any): Promise<User> => {
    const response = await apiClient.put('/users/me', data);
    return response.data;
  },

  getMyPreferences: async (): Promise<any> => {
    const response = await apiClient.get('/users/me/preferences');
    return response.data;
  },

  updatePreferences: async (data: any): Promise<any> => {
    const response = await apiClient.put('/users/me/preferences', data);
    return response.data;
  }
};
