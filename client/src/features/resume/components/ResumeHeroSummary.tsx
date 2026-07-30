import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Clock, ShieldCheck, Target } from 'lucide-react';
import { generateResumeIntelligence } from '../services/resumeAnalysisEngine';

export function ResumeHeroSummary() {
  const { activeResume } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const { scores } = generateResumeIntelligence(activeResume.parsedData, activeResume.aiAnalysisData);
  const healthColor = scores.overall >= 80 ? 'text-green-500' : scores.overall >= 50 ? 'text-amber-500' : 'text-red-500';

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-black text-gray-900 mb-1">{activeResume.originalName}</h2>
        <div className="flex flex-wrap items-center gap-4 text-sm font-bold text-gray-400 uppercase tracking-widest">
          <span className="flex items-center gap-1"><Clock size={14} /> Updated {formatDate(activeResume.uploadDate)}</span>
          <span>•</span>
          <span className="bg-indigo-50 text-indigo-500 px-2 py-0.5 rounded">Version {activeResume.version}</span>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-8 bg-gray-50 p-4 rounded-2xl border border-gray-100">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
            <Target size={12}/> Target Role
          </span>
          <span className="font-bold text-gray-900">Software Engineer</span>
        </div>
        <div className="w-px h-10 bg-gray-200" />
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-1 flex items-center gap-1">
            <ShieldCheck size={12}/> Health
          </span>
          <span className={`font-black text-xl ${healthColor}`}>{scores.overall}/100</span>
        </div>
      </div>
    </div>
  );
}
