import { apiClient } from './client';

export type ApplicationStatus = 'SAVED' | 'APPLIED' | 'INTERVIEW' | 'ASSESSMENT' | 'OFFER' | 'REJECTED' | 'ARCHIVED';

export const applicationsApi = {
  listApplications: async () => {
    const response = await apiClient.get('/applications');
    return response.data;
  },

  createApplication: async (opportunityId: string, status?: ApplicationStatus, notes?: string) => {
    const response = await apiClient.post('/applications', { opportunityId, status, notes });
    return response.data;
  },

  updateApplication: async (id: string, status?: ApplicationStatus, notes?: string) => {
    const response = await apiClient.patch(`/applications/${id}`, { status, notes });
    return response.data;
  },

  deleteApplication: async (id: string) => {
    return apiClient.delete(`/applications/${id}`);
  }
};
