import React from 'react';
import { useResume } from '../context/ResumeContext';
import { generateResumeIntelligence } from '../services/resumeAnalysisEngine';
import { Activity, Code, Briefcase, FileText, AlertTriangle } from 'lucide-react';

export function ResumeOverviewStats() {
  const { activeResume } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const { stats } = generateResumeIntelligence(activeResume.parsedData, activeResume.aiAnalysisData);

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Activity className="text-indigo-500" /> Resume Overview
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 flex flex-col items-center text-center">
          <Code className="text-indigo-500 mb-2" size={24} />
          <span className="text-3xl font-black text-indigo-900 mb-1">{stats.totalSkills}</span>
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Total Skills</span>
        </div>
        
        <div className="bg-green-50/50 p-5 rounded-2xl border border-green-100 flex flex-col items-center text-center">
          <Briefcase className="text-green-500 mb-2" size={24} />
          <span className="text-3xl font-black text-green-900 mb-1">{stats.totalProjects + stats.totalExperience}</span>
          <span className="text-xs font-bold text-green-400 uppercase tracking-widest">Experience Entries</span>
        </div>

        <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100 flex flex-col items-center text-center">
          <FileText className="text-blue-500 mb-2" size={24} />
          <span className="text-3xl font-black text-blue-900 mb-1">~{stats.estimatedWordCount}</span>
          <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">Words (Est.)</span>
        </div>

        <div className={`p-5 rounded-2xl border flex flex-col items-center text-center ${stats.missingSections.length > 0 ? 'bg-red-50/50 border-red-100' : 'bg-gray-50/50 border-gray-100'}`}>
          <AlertTriangle className={stats.missingSections.length > 0 ? 'text-red-500 mb-2' : 'text-gray-400 mb-2'} size={24} />
          <span className={`text-3xl font-black mb-1 ${stats.missingSections.length > 0 ? 'text-red-900' : 'text-gray-900'}`}>{stats.missingSections.length}</span>
          <span className={`text-xs font-bold uppercase tracking-widest ${stats.missingSections.length > 0 ? 'text-red-400' : 'text-gray-400'}`}>Missing Sections</span>
        </div>
      </div>
    </div>
  );
}
