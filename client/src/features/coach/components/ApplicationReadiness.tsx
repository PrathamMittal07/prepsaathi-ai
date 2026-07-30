import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { Send, CheckCircle2, XCircle, Clock } from 'lucide-react';

export function ApplicationReadiness() {
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.applicationReadiness || coachData.applicationReadiness.length === 0) return null;

  const getStatusDisplay = (status: string) => {
    switch(status) {
      case 'Ready to Apply': return { icon: <CheckCircle2 size={16} />, color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'Need Preparation': return { icon: <Clock size={16} />, color: 'text-orange-700 bg-orange-50 border-orange-200' };
      case 'Do Not Apply Yet': return { icon: <XCircle size={16} />, color: 'text-red-700 bg-red-50 border-red-200' };
      default: return { icon: null, color: 'text-gray-700 bg-gray-50 border-gray-200' };
    }
  };

  return (
    <div className="saas-card p-6 lg:p-8">
      <div className="flex items-center gap-3 mb-6">
        <Send className="text-emerald-500" size={24} />
        <h3 className="text-xl font-black text-gray-900 tracking-tight">Application Readiness</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coachData.applicationReadiness.map((item, idx) => {
          const display = getStatusDisplay(item.status);
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: idx * 0.05 }}
              className="p-4 rounded-xl border border-gray-100 flex items-center justify-between bg-gray-50/50"
            >
              <span className="font-bold text-gray-900">{item.companyName}</span>
              <span className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md border ${display.color}`}>
                {display.icon} {item.status}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
