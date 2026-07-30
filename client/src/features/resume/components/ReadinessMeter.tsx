import React from 'react';
import { useResume } from '../context/ResumeContext';
import { generateSkillGapIntelligence } from '../services/skillGapEngine';
import { BatteryCharging, Battery, BatteryFull } from 'lucide-react';
import { motion } from 'framer-motion';

export function ReadinessMeter() {
  const { activeResume, targetRole } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const { resumeReadiness, roadmapReadiness, combinedReadiness } = generateSkillGapIntelligence(activeResume.parsedData, targetRole);

  const getMeterColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 50) return 'bg-amber-500';
    return 'bg-red-500';
  };

  const getMeterIcon = (score: number) => {
    if (score >= 80) return <BatteryFull size={24} className="text-green-500" />;
    if (score >= 50) return <BatteryCharging size={24} className="text-amber-500" />;
    return <Battery size={24} className="text-red-500" />;
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        {getMeterIcon(combinedReadiness)} Career Readiness
      </h3>
      <p className="text-sm text-gray-500 mb-8">
        Your readiness is a combination of what your resume already proves and what you are actively learning on your Prep2Place roadmap.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gray-700">Resume Readiness</span>
            <span className="text-sm font-black text-gray-900">{resumeReadiness}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${resumeReadiness}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${getMeterColor(resumeReadiness)}`} 
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <span className="text-sm font-bold text-gray-700">Roadmap Progress</span>
            <span className="text-sm font-black text-gray-900">{roadmapReadiness}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${roadmapReadiness}%` }}
              transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
              className={`h-full rounded-full bg-indigo-500`} 
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-end mb-2">
            <span className="text-base font-bold text-indigo-900">Combined Readiness</span>
            <span className="text-lg font-black text-indigo-600">{combinedReadiness}%</span>
          </div>
          <div className="w-full h-4 bg-indigo-50 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${combinedReadiness}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.4 }}
              className={`h-full rounded-full bg-indigo-600`} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
