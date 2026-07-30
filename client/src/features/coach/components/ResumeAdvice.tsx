import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { FileText, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function ResumeAdvice() {
  const router = useRouter();
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.resumeAdvice || coachData.resumeAdvice.length === 0) return null;

  return (
    <div className="saas-card p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <FileText className="text-blue-500" size={24} /> Resume Advice
        </h3>
      </div>
      
      <div className="flex-1 space-y-3">
        {coachData.resumeAdvice.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-3 p-4 rounded-xl border border-gray-100 bg-gray-50 group cursor-pointer hover:border-blue-200 hover:bg-white transition-all"
            onClick={() => router.push(item.deepLink)}
          >
            <div className="shrink-0 mt-1">
              <div className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition-transform" />
            </div>
            <p className="text-sm font-semibold text-gray-700 leading-snug group-hover:text-blue-700 transition-colors">
              {item.advice}
            </p>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => router.push('/dashboard/resume')}
        className="mt-6 w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        Open Resume Analyzer <ArrowRight size={16} />
      </button>
    </div>
  );
}
