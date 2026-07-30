import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { BookOpen, Clock, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LearningPriorities() {
  const router = useRouter();
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.learningPriorities || coachData.learningPriorities.length === 0) return null;

  const getPriorityColor = (level: string) => {
    switch (level) {
      case 'Highest': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'Revision': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'Mastered': return 'text-emerald-700 bg-emerald-100 border-emerald-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="saas-card p-6 lg:p-8 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <BookOpen className="text-indigo-500" size={24} /> Learning Priorities
        </h3>
      </div>
      
      <div className="flex-1 space-y-4">
        {coachData.learningPriorities.map((item, idx) => (
          <motion.div 
            key={item.id}
            initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-xl border border-gray-100 hover:border-indigo-200 bg-gray-50 hover:bg-white transition-all group cursor-pointer"
            onClick={() => router.push('/dashboard/roadmap')}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {item.topic}
              </span>
              <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getPriorityColor(item.priorityLevel)}`}>
                {item.priorityLevel}
              </span>
            </div>
            
            <p className="text-xs font-semibold text-gray-500 mb-3 line-clamp-1">{item.recommendation}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 w-full max-w-[200px]">
                <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${item.progress}%` }} />
                </div>
                <span className="text-[10px] font-bold text-gray-400">{item.progress}%</span>
              </div>
              
              <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-1 rounded-md">
                <Clock size={12} /> {item.estimatedStudyTime}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button 
        onClick={() => router.push('/dashboard/roadmap')}
        className="mt-6 w-full py-3 bg-gray-50 hover:bg-indigo-50 text-indigo-600 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
      >
        View Full Roadmap <ArrowRight size={16} />
      </button>
    </div>
  );
}
