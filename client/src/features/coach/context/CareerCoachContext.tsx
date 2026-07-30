'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CareerCoachPayload } from '../core/coachTypes';
import { formatCoachPayload, createEmptyCoach } from '../core/careerCoachEngine';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useUserProfile } from '@/features/profile/context/UserProfileContext';
import { useResume } from '@/features/resume/context/ResumeContext';

interface CareerCoachContextType {
  coachData: CareerCoachPayload | null;
  loading: boolean;
}

const CareerCoachContext = createContext<CareerCoachContextType | undefined>(undefined);

export function CareerCoachProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const { careerProfile } = useUserProfile();
  const { analysis, activeResume } = useResume();
  const [coachData, setCoachData] = useState<CareerCoachPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function fetchCoaching() {
      setLoading(true);
      try {
        if (active) {
          const payload = formatCoachPayload(user, careerProfile, analysis, activeResume);
          setCoachData(payload);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchCoaching();

    return () => {
      active = false;
    };
  }, [user, careerProfile, analysis, activeResume]);

  return (
    <CareerCoachContext.Provider value={{ coachData, loading }}>
      {children}
    </CareerCoachContext.Provider>
  );
}

export const useCareerCoach = (): CareerCoachContextType => {
  const context = useContext(CareerCoachContext);
  if (context === undefined) {
    throw new Error('useCareerCoach must be used within a CareerCoachProvider');
  }
  return context;
};
