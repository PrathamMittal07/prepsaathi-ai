import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { Eye, TrendingUp, TrendingDown, FileText, Crosshair } from 'lucide-react';

export function CareerInsights() {
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.insights || coachData.insights.length === 0) return null;

  const getInsightIcon = (category: string) => {
    switch (category) {
      case 'performance': return <TrendingUp className="text-emerald-500" size={20} />;
      case 'resume': return <FileText className="text-blue-500" size={20} />;
      case 'consistency': return <TrendingDown className="text-orange-500" size={20} />;
      case 'focus': return <Crosshair className="text-purple-500" size={20} />;
      default: return <Eye className="text-gray-500" size={20} />;
    }
  };

  return (
    <div className="saas-card p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Eye className="text-indigo-500" size={24} />
        <h3 className="text-xl font-black text-gray-900 tracking-tight">AI Career Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {coachData.insights.map((insight, idx) => (
          <motion.div 
            key={insight.id}
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.1 }}
            className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100"
          >
            <div className="shrink-0 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
              {getInsightIcon(insight.category)}
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">
                {insight.category} Insight
              </div>
              <p className="font-semibold text-gray-800 leading-snug">
                {insight.message}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
