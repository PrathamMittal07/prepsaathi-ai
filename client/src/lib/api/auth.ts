import { apiClient } from './client';
import { AuthResponse, User } from './types';

// I will define the types here so we don't depend on features/auth/services/auth.ts which I will delete.
export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const authApi = {
  login: async (data: LoginData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<AuthResponse> => {
    const response = await apiClient.post('/auth/register', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  logout: async (): Promise<void> => {
    // In a full implementation, you might call /auth/logout if it exists.
    // Our backend doesn't have a /auth/logout endpoint, so we just clear local state.
    return Promise.resolve();
  }
};
