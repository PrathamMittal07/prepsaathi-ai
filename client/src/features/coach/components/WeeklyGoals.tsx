import React from 'react';
import { motion } from 'framer-motion';
import { useCareerCoach } from '../context/CareerCoachContext';
import { CalendarDays, CheckCircle2, Circle } from 'lucide-react';

export function WeeklyGoals() {
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.weeklyGoals || coachData.weeklyGoals.length === 0) return null;

  return (
    <div className="saas-card p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <CalendarDays className="text-orange-500" size={24} /> Weekly Milestones
        </h3>
        <span className="text-sm font-bold text-gray-400">
          {coachData.weeklyGoals.filter(g => g.completed).length} / {coachData.weeklyGoals.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {coachData.weeklyGoals.map((goal, idx) => (
          <motion.div 
            key={goal.id}
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.1 }}
            className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
              goal.completed ? 'bg-gray-50/50 border-transparent opacity-60' : 'bg-white border-gray-100 hover:border-orange-200 hover:shadow-sm'
            }`}
          >
            {goal.completed ? (
              <CheckCircle2 size={24} className="text-emerald-500 shrink-0" />
            ) : (
              <Circle size={24} className="text-gray-300 shrink-0" />
            )}
            <span className={`font-bold text-lg ${goal.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
              {goal.title}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
