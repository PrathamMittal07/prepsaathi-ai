'use client';

import React from 'react';
// mock
import { Trophy, Star, Target, Flame, ChevronRight, TrendingUp, TrendingDown, Minus, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

export function CareerJourneyTimeline() {
  const memory: any = { timelineEvents: [], achievements: [], analytics: {}, coachingInsight: '' };

  const { timelineEvents, achievements, analytics, coachingInsight } = memory;

  const getIcon = (type: string) => {
    switch (type) {
      case 'trophy': return <Trophy size={16} className="text-yellow-500" />;
      case 'star': return <Star size={16} className="text-blue-500" />;
      case 'flame': return <Flame size={16} className="text-orange-500" />;
      case 'target': return <Target size={16} className="text-emerald-500" />;
      default: return <Star size={16} className="text-gray-500" />;
    }
  };

  const getEventDotColor = (type: string) => {
    if (type.includes('Increased') || type.includes('Improved') || type.includes('Mastered')) return 'bg-emerald-500';
    if (type.includes('Decreased') || type.includes('Broken')) return 'bg-red-500';
    return 'bg-indigo-500';
  };

  return (
    <div className="w-full bg-white rounded-[32px] p-8 shadow-sm border border-slate-100 flex flex-col lg:flex-row gap-12">
      
      {/* Left Column - Analytics & Insights */}
      <div className="lg:w-1/3 flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Career Journey</h2>
          <p className="text-slate-500 text-sm mt-1">Your AI coaching history</p>
        </div>

        <div className="bg-indigo-50/50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-center gap-2 mb-3 text-indigo-900 font-bold text-sm uppercase tracking-wider">
            <Brain size={16} className="text-indigo-500" /> AI Coach Insight
          </div>
          <p className="text-indigo-950 font-medium leading-relaxed text-sm">
            "{coachingInsight}"
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Weekly Growth</div>
             <div className="flex items-center gap-2">
                <span className={`text-xl font-black ${analytics.weeklyGrowth > 0 ? 'text-emerald-600' : analytics.weeklyGrowth < 0 ? 'text-red-600' : 'text-slate-600'}`}>
                  {analytics.weeklyGrowth > 0 ? '+' : ''}{analytics.weeklyGrowth}%
                </span>
                {analytics.weeklyGrowth > 0 ? <TrendingUp size={16} className="text-emerald-500" /> : analytics.weeklyGrowth < 0 ? <TrendingDown size={16} className="text-red-500" /> : <Minus size={16} className="text-slate-400" />}
             </div>
          </div>
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Momentum</div>
             <div className="flex items-center gap-2 text-slate-700">
                <span className="text-sm font-black">{analytics.careerMomentum}</span>
             </div>
          </div>
        </div>
        
        {achievements.length > 0 && (
          <div className="mt-4">
            <h3 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Recent Achievements</h3>
            <div className="flex flex-col gap-3">
              {achievements.slice(0, 3).map((ach: any) => (
                <div key={ach.id} className="flex items-center gap-3 p-3 rounded-xl bg-amber-50/30 border border-amber-100/50">
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm border border-amber-100">
                     {getIcon(ach.iconType)}
                   </div>
                   <div>
                     <p className="text-sm font-bold text-slate-900">{ach.title}</p>
                     <p className="text-xs text-slate-500">{ach.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Column - Timeline */}
      <div className="lg:w-2/3">
        <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-wider">Timeline</h3>
        
        <div className="relative pl-4 border-l-2 border-slate-100 space-y-8">
          {timelineEvents.map((evt: any, idx: number) => (
            <motion.div 
              key={evt.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative"
            >
              <div className={`absolute w-3 h-3 rounded-full -left-[23px] top-1.5 ${getEventDotColor(evt.type)} ring-4 ring-white shadow-sm`} />
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 mb-1">
                <h4 className="text-base font-bold text-slate-900">{evt.title}</h4>
                <span className="text-xs font-medium text-slate-400">
                  {new Date(evt.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{evt.description}</p>
            </motion.div>
          ))}
          
          <div className="relative">
            <div className="absolute w-3 h-3 rounded-full -left-[23px] top-1.5 bg-slate-200 ring-4 ring-white" />
            <h4 className="text-sm font-bold text-slate-400 italic">Journey Started</h4>
          </div>
        </div>
      </div>
      
    </div>
  );
}
