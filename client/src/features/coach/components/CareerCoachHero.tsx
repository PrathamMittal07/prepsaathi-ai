import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { Sparkles, Brain, Target, Building2 } from 'lucide-react';

export function CareerCoachHero() {
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData) return null;

  return (
    <div className="bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#311024] rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-2xl border border-indigo-500/20 mb-6">
      {/* Background glowing effects */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-pink-500 rounded-full blur-[120px] opacity-20 translate-y-1/2 -translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="w-full">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-indigo-300 font-bold tracking-widest text-[11px] uppercase mb-4"
          >
            <Sparkles size={14} className="animate-pulse text-yellow-300" /> AI Career Coach
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold tracking-normal mb-4"
          >
            {coachData.greeting}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className="w-full text-indigo-100/90 text-sm md:text-base leading-relaxed max-w-[42rem] font-medium mb-6 whitespace-pre-wrap"
          >
            {coachData.overallReadiness > 0 
              ? "Welcome back!\n\nComplete your profile and upload your resume to unlock AI-powered coaching, resume analysis, career insights, and personalized recommendations."
              : "Welcome to your personalized career coaching dashboard.\n\nComplete your profile and upload a resume to receive AI-powered insights and recommendations."}
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center h-[90px]">
              <div className="text-indigo-300 mb-1"><Brain size={18} /></div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1 truncate">Overall Readiness</div>
              <div className="text-xl font-black">{coachData.overallReadiness}%</div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center h-[90px]">
              <div className="text-pink-300 mb-1"><Target size={18} /></div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1 truncate">Current Goal</div>
              <div className="text-sm font-bold leading-tight line-clamp-2 break-words">{coachData.currentGoal}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center h-[90px]">
              <div className="text-emerald-300 mb-1"><Building2 size={18} /></div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1 truncate">Target Company</div>
              <div className="text-sm font-bold leading-tight line-clamp-2 break-words">{coachData.targetCompany}</div>
            </div>

            <div className="bg-white/5 backdrop-blur-md rounded-xl p-3 border border-white/10 flex flex-col justify-center h-[90px]">
              <div className="text-orange-300 mb-1"><Sparkles size={18} /></div>
              <div className="text-[9px] font-bold text-white/50 uppercase tracking-widest mb-1 truncate">Career Path</div>
              <div className="text-sm font-bold leading-tight line-clamp-2 break-words">{coachData.careerPath}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
