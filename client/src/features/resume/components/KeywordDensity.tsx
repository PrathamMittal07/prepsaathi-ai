import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Search, Hash, AlertCircle } from 'lucide-react';

export function KeywordDensity() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Search className="text-indigo-500" /> Keyword Analysis
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><Hash size={14}/> Present</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.present.map((kw: any, i: number) => (
              <span key={i} className="px-2 py-1 bg-white border border-gray-200 text-gray-700 text-xs font-bold rounded-md">{kw}</span>
            ))}
          </div>
        </div>

        <div className="bg-red-50/50 rounded-2xl p-5 border border-red-100">
          <h4 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><AlertCircle size={14}/> Missing</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.missing.map((kw: any, i: number) => (
              <span key={i} className="px-2 py-1 bg-white border border-red-200 text-red-700 text-xs font-bold rounded-md">{kw}</span>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50/50 rounded-2xl p-5 border border-indigo-100">
          <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-3 flex items-center gap-1.5"><AlertCircle size={14}/> High Priority</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.keywords.highPriority.map((kw: any, i: number) => (
              <span key={i} className="px-2 py-1 bg-indigo-500 text-white text-xs font-bold rounded-md shadow-sm">{kw}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
