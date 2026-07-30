import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Layers } from 'lucide-react';

export function SectionGrader() {
  const { analysis } = useResume();

  if (!analysis) return null;

  const sections = [
    { name: 'Summary', data: analysis.sectionAnalysis.summary },
    { name: 'Experience', data: analysis.sectionAnalysis.experience },
    { name: 'Projects', data: analysis.sectionAnalysis.projects },
    { name: 'Education', data: analysis.sectionAnalysis.education },
    { name: 'Skills', data: analysis.sectionAnalysis.skills },
  ];

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Layers className="text-indigo-500" /> Section Analysis
      </h3>

      <div className="space-y-4">
        {sections.map((sec, idx) => (
          <div key={idx} className="flex flex-col md:flex-row md:items-start gap-4 p-4 rounded-2xl border border-gray-100 hover:border-indigo-100 hover:bg-gray-50 transition-colors">
            <div className="w-32 shrink-0">
              <h4 className="font-bold text-gray-900">{sec.name}</h4>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${sec.data.score >= 80 ? 'bg-green-100 text-green-700' : sec.data.score >= 60 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                  {sec.data.status}
                </span>
                <span className="text-xs font-bold text-gray-500">{sec.data.score}/100</span>
              </div>
            </div>
            
            <div className="flex-1">
              {sec.data.suggestions.length > 0 ? (
                <ul className="space-y-1">
                  {sec.data.suggestions.map((sug: any, i: number) => (
                    <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                      {sug}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-green-600 font-medium">Looking good! No suggestions.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
