'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CareerCoachHero } from '../../../features/coach/components/CareerCoachHero';
import { CoachingCards } from '../../../features/coach/components/CoachingCards';
import { CareerInsights } from '../../../features/coach/components/CareerInsights';
import { ActionPlan } from '../../../features/coach/components/ActionPlan';
import { LearningPriorities } from '../../../features/coach/components/LearningPriorities';
import { InterviewStrategy } from '../../../features/coach/components/InterviewStrategy';
import { ResumeAdvice } from '../../../features/coach/components/ResumeAdvice';
import { ApplicationReadiness } from '../../../features/coach/components/ApplicationReadiness';
import { WeeklyGoals } from '../../../features/coach/components/WeeklyGoals';
import { CoachChat } from '../../../features/coach/components/CoachChat';

export default function CareerCoachPage() {
  return (
    <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto' }} className="w-full p-4 md:p-6 mb-12">
      {/* Hero Section */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <CareerCoachHero />
      </motion.div>

      {/* AI Chat - Primary Interaction */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="mb-6">
        <CoachChat />
      </motion.div>

      {/* Today's Coaching Summary (Alerts) */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.15 }} className="mb-6">
        <CoachingCards />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        
        {/* Left Column: Action Plan, Insights, Application */}
        <div className="lg:col-span-2 flex flex-col gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <ActionPlan />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}>
            <CareerInsights />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <ApplicationReadiness />
          </motion.div>
        </div>

        {/* Right Column: Interview, Learning, Resume, Weekly, Preview */}
        <div className="lg:col-span-1 flex flex-col gap-4 md:gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }} className="min-h-[300px]">
            <InterviewStrategy />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
            <LearningPriorities />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.5 }}>
            <ResumeAdvice />
          </motion.div>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <WeeklyGoals />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
