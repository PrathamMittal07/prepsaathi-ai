import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Wand2, ArrowDown } from 'lucide-react';

export function OneClickImprovements() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Wand2 className="text-indigo-500" /> One-Click Improvements
      </h3>

      <div className="space-y-6">
        {analysis.improvements.map((imp: any, idx: number) => (
          <div key={idx} className="bg-indigo-50/30 rounded-2xl p-6 border border-indigo-100/50 relative">
            <span className="absolute -top-3 left-4 bg-white border border-indigo-100 text-indigo-500 text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded shadow-sm">
              {imp.section}
            </span>
            
            <div className="flex flex-col md:flex-row gap-4 items-stretch">
              <div className="flex-1 bg-white rounded-xl p-4 border border-gray-200">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-2">Current</span>
                <p className="text-sm text-gray-600 line-through decoration-red-400/50">{imp.current}</p>
              </div>
              
              <div className="flex items-center justify-center">
                <ArrowDown className="text-indigo-300 md:-rotate-90" size={24} />
              </div>

              <div className="flex-1 bg-indigo-50 rounded-xl p-4 border border-indigo-200 shadow-sm">
                <span className="text-xs font-bold text-indigo-500 uppercase tracking-widest block mb-2 flex items-center gap-1"><Wand2 size={12}/> AI Suggested</span>
                <p className="text-sm text-indigo-900 font-medium">{imp.suggested}</p>
              </div>
            </div>

            <div className="mt-4 flex items-start gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
              <span><span className="font-bold">Why:</span> {imp.reason}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
