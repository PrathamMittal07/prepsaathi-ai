import React from 'react';
import { useResume } from '../context/ResumeContext';
import { generateResumeIntelligence } from '../services/resumeAnalysisEngine';
import { TrendingUp, TrendingDown, ArrowRight } from 'lucide-react';

export function StrengthsAndWeaknesses() {
  const { activeResume } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const { strengths, opportunities } = generateResumeIntelligence(activeResume.parsedData, activeResume.aiAnalysisData);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div className="bg-white rounded-3xl p-8 border border-green-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-green-50 rounded-full blur-3xl -mr-10 -mt-10" />
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
          <TrendingUp className="text-green-500" /> Key Strengths
        </h3>
        <div className="space-y-4 relative z-10">
          {strengths.map((item: any, idx: number) => (
            <div key={idx} className="bg-green-50/50 p-4 rounded-2xl border border-green-100">
              <h4 className="font-bold text-green-900 text-sm mb-1">{item.title}</h4>
              <p className="text-sm text-green-700/80">{item.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-amber-100 shadow-sm relative overflow-hidden">
        <div className="absolute right-0 top-0 w-32 h-32 bg-amber-50 rounded-full blur-3xl -mr-10 -mt-10" />
        <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 relative z-10">
          <TrendingDown className="text-amber-500" /> Opportunities
        </h3>
        <div className="space-y-4 relative z-10">
          {opportunities.map((item: any, idx: number) => (
            <div key={idx} className="bg-amber-50/50 p-4 rounded-2xl border border-amber-100">
              <h4 className="font-bold text-amber-900 text-sm mb-1">{item.title}</h4>
              <p className="text-sm text-amber-700/80">{item.description}</p>
            </div>
          ))}
          <div className="mt-4 flex items-center justify-between bg-white border border-gray-100 p-3 rounded-xl shadow-sm cursor-pointer hover:border-indigo-200 transition-colors">
            <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest">Get AI Suggestions</span>
            <ArrowRight size={14} className="text-indigo-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
