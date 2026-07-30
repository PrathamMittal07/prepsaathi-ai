import React from 'react';
import { useResume } from '../context/ResumeContext';
import { FileJson, Braces } from 'lucide-react';

export function ParserDashboard() {
  const { activeResume } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  return (
    <div className="bg-gray-900 rounded-3xl p-8 shadow-xl mt-8 animate-fade-in-up">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <FileJson className="text-indigo-400" /> Developer Parser View
        </h3>
        <span className="bg-indigo-500/20 text-indigo-300 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest border border-indigo-500/30">
          Raw JSON Output
        </span>
      </div>

      <p className="text-gray-400 mb-6 text-sm">
        This is a temporary development view showing the structured data extracted by our Resume Parsing Engine. This JSON payload will power all future Gemini-based AI features.
      </p>

      <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800 overflow-x-auto relative">
        <Braces className="absolute top-4 right-4 text-gray-800" size={120} />
        <pre className="text-green-400 text-xs sm:text-sm font-mono leading-relaxed relative z-10">
          {JSON.stringify(activeResume.parsedData, null, 2)}
        </pre>
      </div>
    </div>
  );
}
