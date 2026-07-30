import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { AlertTriangle, Lightbulb, Zap } from 'lucide-react';

export function CoachingCards() {
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.coachingCards || coachData.coachingCards.length === 0) return null;

  // Render Missing Resume explicitly if present
  const missingResumeCard = coachData.coachingCards.find(c => c.type === 'warning' && c.title === 'Missing Resume');

  if (missingResumeCard) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
        className="bg-white border border-red-100 rounded-2xl overflow-hidden shadow-sm"
      >
        <div className="bg-red-50/50 px-6 py-4 border-b border-red-100 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
            <AlertTriangle size={16} />
          </div>
          <h3 className="font-bold text-slate-800 tracking-tight">Resume Status</h3>
        </div>
        <div className="p-6 md:p-8">
          <h4 className="text-xl font-bold text-red-600 mb-6 flex items-center gap-2">
            <span>❌</span> Resume not uploaded
          </h4>
          
          <div className="mb-8">
            <p className="text-slate-700 font-medium mb-4">Upload your resume to unlock:</p>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> AI Resume Review
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Resume Match Score
              </li>
              <li className="flex items-center gap-3 text-slate-600">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div> Personalized Coaching
              </li>
            </ul>
          </div>
          
          <a href="/dashboard/resume" className="inline-flex items-center justify-center bg-indigo-600 text-white font-medium px-6 py-3 rounded-xl hover:bg-indigo-700 transition-colors shadow-sm shadow-indigo-200">
            Upload Resume
          </a>
        </div>
      </motion.div>
    );
  }

  // Fallback for other coaching cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {coachData.coachingCards.map((card, idx) => {
        let style = { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-900', icon: <Lightbulb className="text-gray-500" /> };
        if (card.type === 'opportunity') style = { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-900', icon: <Lightbulb className="text-emerald-500" /> };
        else if (card.type === 'warning') style = { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-900', icon: <AlertTriangle className="text-red-500" /> };
        else if (card.type === 'motivation') style = { bg: 'bg-indigo-50', border: 'border-indigo-100', text: 'text-indigo-900', icon: <Zap className="text-indigo-500" /> };

        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className={`p-6 rounded-[2rem] border ${style.bg} ${style.border} flex flex-col justify-between h-full`}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm">
                {style.icon}
              </div>
              <h3 className={`font-black text-sm uppercase tracking-wider ${style.text}`}>
                {card.title}
              </h3>
            </div>
            <p className={`font-semibold text-lg leading-snug ${style.text}/80`}>
              {card.message}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
