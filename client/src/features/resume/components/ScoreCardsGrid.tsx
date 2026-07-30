import React from 'react';
import { useResume } from '../context/ResumeContext';
import { generateResumeIntelligence } from '../services/resumeAnalysisEngine';
import { motion } from 'framer-motion';

function CircularProgress({ percentage, label, sublabel, color, delay = 0 }: { percentage: number, label: string, sublabel?: string, color: string, delay?: number }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:border-gray-200 transition-colors">
      <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10 ${color.replace('text-', 'bg-')} group-hover:scale-150 transition-transform`} />
      
      <div className="relative w-24 h-24 mb-3">
        <svg className="w-full h-full transform -rotate-90">
          <circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-100"
          />
          <motion.circle
            cx="48"
            cy="48"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.5, delay, ease: "easeOut" }}
            className={color}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-black text-gray-900">{percentage}<span className="text-xs text-gray-400">%</span></span>
        </div>
      </div>
      <span className="text-sm font-bold text-gray-900 mb-1">{label}</span>
      {sublabel && <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{sublabel}</span>}
    </div>
  );
}

export function ScoreCardsGrid() {
  const { activeResume } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const { scores } = generateResumeIntelligence(activeResume.parsedData, activeResume.aiAnalysisData);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
      <CircularProgress 
        percentage={scores.overall} 
        label="Resume Score" 
        sublabel="Overall"
        color="text-indigo-500" 
        delay={0}
      />
      <CircularProgress 
        percentage={scores.ats} 
        label="ATS Match" 
        sublabel="Compatibility"
        color="text-green-500" 
        delay={0.1}
      />
      <CircularProgress 
        percentage={scores.roleMatch} 
        label="Role Match" 
        sublabel="Alignment"
        color="text-blue-500" 
        delay={0.2}
      />
      <CircularProgress 
        percentage={scores.readiness} 
        label="Readiness" 
        sublabel="Interview"
        color="text-amber-500" 
        delay={0.3}
      />
      <CircularProgress 
        percentage={scores.completeness} 
        label="Completeness" 
        sublabel="Structure"
        color="text-purple-500" 
        delay={0.4}
      />
    </div>
  );
}
