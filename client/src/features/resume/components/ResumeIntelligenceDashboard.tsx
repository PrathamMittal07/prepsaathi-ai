import React from 'react';
import { motion } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { Target, CheckCircle2, AlertTriangle, XCircle, Lightbulb, TrendingUp, Sparkles } from 'lucide-react';

export function ResumeIntelligenceDashboard() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mt-8 space-y-8"
    >
      {/* Hero Score Card */}
      <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
              <Sparkles className="text-indigo-500" size={28} /> AI Analysis Complete
            </h2>
            <p className="text-slate-600 mt-4 text-lg leading-relaxed">
              {analysis.summary}
            </p>
          </div>
          <div className="shrink-0 flex flex-col items-center justify-center p-8 bg-indigo-50/50 rounded-full border-8 border-white shadow-sm relative">
            <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="46" fill="none" stroke="#E0E7FF" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="46" fill="none" 
                stroke={(analysis.atsScore || 0) >= 80 ? "#10B981" : (analysis.atsScore || 0) >= 50 ? "#F59E0B" : "#EF4444"} 
                strokeWidth="8" 
                strokeDasharray="289.026" 
                strokeDashoffset={289.026 * (1 - (analysis.atsScore || 0) / 100)} 
                strokeLinecap="round" 
              />
            </svg>
            <span className="text-5xl font-black text-slate-900 z-10 relative">{analysis.atsScore || 0}</span>
            <span className="text-sm font-bold text-slate-500 uppercase tracking-wider z-10 relative">ATS Score</span>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Strengths */}
        <div className="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-100/50">
          <h3 className="text-lg font-black text-emerald-900 mb-6 flex items-center gap-2">
            <CheckCircle2 className="text-emerald-500" size={20} /> Key Strengths
          </h3>
          <ul className="space-y-3">
            {analysis.strengths?.map((s: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs mt-0.5">{i+1}</span>
                <span className="text-emerald-950/80 font-medium">{s}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weaknesses */}
        <div className="bg-red-50/50 rounded-3xl p-6 border border-red-100/50">
          <h3 className="text-lg font-black text-red-900 mb-6 flex items-center gap-2">
            <AlertTriangle className="text-red-500" size={20} /> Areas to Improve
          </h3>
          <ul className="space-y-3">
            {analysis.weaknesses?.map((w: string, i: number) => (
              <li key={i} className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600 font-bold text-xs mt-0.5">{i+1}</span>
                <span className="text-red-950/80 font-medium">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Missing Skills */}
      {analysis.missingSkills?.length > 0 && (
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
          <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
            <Target className="text-indigo-500" size={20} /> Missing Keywords & Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {analysis.missingSkills.map((skill: string, idx: number) => (
              <span key={idx} className="px-3 py-1.5 bg-slate-100 text-slate-700 font-bold text-sm rounded-xl border border-slate-200">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Action Plan */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
        <h3 className="text-lg font-black text-slate-900 mb-6 flex items-center gap-2">
          <Lightbulb className="text-amber-500" size={20} /> Actionable Suggestions
        </h3>
        <div className="grid gap-4">
          {analysis.suggestions?.map((suggestion: string, idx: number) => (
            <div key={idx} className="p-4 bg-amber-50/50 border border-amber-100/50 rounded-2xl flex items-start gap-4">
              <TrendingUp className="text-amber-500 shrink-0 mt-0.5" size={20} />
              <p className="text-amber-950/80 font-medium leading-relaxed">{suggestion}</p>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
