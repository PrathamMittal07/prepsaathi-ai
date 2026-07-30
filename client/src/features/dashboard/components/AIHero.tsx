'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/features/auth/context/AuthContext';
import { useUserProfile } from '../../profile/context/UserProfileContext';
import { Target, FileText, Video, Map, Flame } from 'lucide-react';

export function AIHero() {
  const { user } = useAuth();
  const { careerProfile, loading } = useUserProfile();
  const [greeting, setGreeting] = useState('Good Morning');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good Morning');
    else if (hour < 18) setGreeting('Good Afternoon');
    else setGreeting('Good Evening');
  }, []);

  if (loading) return null;

  const firstName = user?.profile?.firstName || 'Guest';

  return (
    <div className="flex flex-col gap-6 md:gap-8 pt-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900 mb-2"
          >
            {greeting}, {firstName}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-500 font-medium text-lg"
          >
            You're on a great journey! Keep going, your future self is proud.
          </motion.p>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}
        className="grid grid-cols-2 lg:grid-cols-5 gap-4"
      >
        <div className="glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <Target size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Readiness</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">--%</div>
            <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">Awaiting data</div>
          </div>
        </div>
        
        <div className="glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
              <FileText size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Resume</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">--<span className="text-sm font-semibold text-gray-400">/100</span></div>
            <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">Upload to analyze</div>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
              <Video size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Interview</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">--%</div>
            <div className="text-xs font-semibold text-gray-400 flex items-center gap-1">Take a mock interview</div>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center shrink-0">
              <Map size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Roadmap</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">--%</div>
            <div className="text-xs font-semibold text-gray-400">0 / 0 topics</div>
          </div>
        </div>

        <div className="glass-card p-5 flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
              <Flame size={16} />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">Streak</span>
          </div>
          <div>
            <div className="text-2xl font-black text-gray-900 leading-none mb-1">0 <span className="text-sm font-semibold text-gray-400">days</span></div>
            <div className="text-xs font-semibold text-gray-400">Start learning today</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
