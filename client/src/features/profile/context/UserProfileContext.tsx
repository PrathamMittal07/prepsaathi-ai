'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { careerApi } from '@/lib/api/career';
import { userApi } from '@/lib/api/user';
import { useAuth } from '@/features/auth/context/AuthContext';
import toast from 'react-hot-toast';

interface UserProfileContextType {
  careerProfile: any | null;
  preferences: any | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  updateCareerData: (data: any) => Promise<void>;
  updatePreferencesData: (data: any) => Promise<void>;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export function UserProfileProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [careerProfile, setCareerProfile] = useState<any | null>(null);
  const [preferences, setPreferences] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const [careerRes, prefRes] = await Promise.all([
        careerApi.getCareerProfile().catch(() => null),
        userApi.getMyPreferences().catch(() => null)
      ]);
      setCareerProfile(careerRes);
      setPreferences(prefRes);
    } catch (e) {
      console.error('Failed to fetch profile', e);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateCareerData = async (data: any) => {
    try {
      const updated = await careerApi.updateCareerProfile(data);
      setCareerProfile(updated);
      toast.success('Career profile updated');
    } catch (e: any) {
      toast.error(e.message || 'Failed to update career profile');
      throw e;
    }
  };

  const updatePreferencesData = async (data: any) => {
    try {
      const updated = await userApi.updatePreferences(data);
      setPreferences(updated);
      toast.success('Preferences updated');
    } catch (e: any) {
      toast.error(e.message || 'Failed to update preferences');
      throw e;
    }
  };

  return (
    <UserProfileContext.Provider value={{
      careerProfile,
      preferences,
      loading,
      refreshProfile: fetchProfile,
      updateCareerData,
      updatePreferencesData
    }}>
      {children}
    </UserProfileContext.Provider>
  );
}

export function useUserProfile() {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProfileProvider');
  }
  return context;
}
