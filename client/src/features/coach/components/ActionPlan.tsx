import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { Target, ArrowRight, Clock, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

// mock
export function ActionPlan() {
  const router = useRouter();
  const { coachData, loading } = useCareerCoach();
  const recommendations = coachData?.actionPlan || [];

  if (loading || !coachData || recommendations.length === 0) return null;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'text-red-700 bg-red-100 border-red-200';
      case 'High': return 'text-orange-700 bg-orange-100 border-orange-200';
      case 'Medium': return 'text-blue-700 bg-blue-100 border-blue-200';
      case 'Low': return 'text-gray-700 bg-gray-100 border-gray-200';
      default: return 'text-gray-700 bg-gray-100 border-gray-200';
    }
  };

  return (
    <div className="saas-card p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Target className="text-indigo-500" size={24} />
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Prioritized Action Plan</h3>
      </div>
      
      <div className="space-y-4">
        {recommendations.slice(0, 5).map((action: any, idx: number) => (
          <motion.div 
            key={action.id}
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.1 }}
            className="group flex flex-col md:flex-row gap-6 items-start md:items-center p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer"
            onClick={() => router.push(action.deepLink || '#')}
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md border ${getPriorityColor(action.priority)}`}>
                  Priority: {action.priority}
                </span>
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                {action.title}
              </h4>
              <p className="text-sm font-medium text-gray-500 mb-3">{action.reason}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
                <div className="flex items-center gap-1.5 text-gray-500 bg-gray-50 px-2 py-1 rounded-md">
                  <Clock size={14} /> {action.estimatedTime}
                </div>
                <div className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2 py-1 rounded-md">
                  <Star size={14} /> {action.expectedImpact}
                </div>
              </div>
            </div>
            
            <button className="shrink-0 flex items-center justify-center w-12 h-12 rounded-xl bg-gray-50 text-gray-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
              <ArrowRight size={20} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
