import React from 'react';
import { motion } from 'framer-motion';
import { Target, Clock, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function DailyMissionCard() {
  const router = useRouter();
  const mission: any = { title: "Mock Mission", totalEstimatedMinutes: 30, tasks: [] };

  const loading = false;
  if (loading || !mission) return null;

  return (
    <div className="glass-card p-6 sm:p-8 relative h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900">
          <Target className="text-[#8E2C4B]" size={24} /> Today's Mission
        </h3>
        <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
          <Clock size={14} /> {mission.totalEstimatedMinutes} Mins
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <div className="mb-4">
          <p className="text-gray-500 text-sm mb-4">Complete your tasks and level up your placement journey.</p>
          
          <div className="space-y-3">
            {mission.tasks.slice(0, 3).map((task: any, idx: number) => (
              <div key={task.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="text-emerald-500" size={18} />
                  ) : (
                    <Circle className="text-gray-300" size={18} />
                  )}
                  <span className={`text-sm font-semibold ${task.status === 'completed' ? 'text-gray-400 line-through' : 'text-gray-700'}`}>
                    {task.title}
                  </span>
                </div>
                <button 
                  onClick={() => router.push(task.actionUrl || task.deepLink)}
                  className="px-3 py-1 text-xs font-bold rounded-md border border-gray-200 text-gray-600 hover:border-[#8E2C4B] hover:text-[#8E2C4B] transition-colors"
                >
                  {task.status === 'completed' ? 'Review' : 'Start'}
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between text-xs font-bold text-gray-500 mb-2">
            <span>{mission.tasks.filter((t: any) => t.status === 'completed').length} / {mission.tasks.length} Completed</span>
            <span>{mission.completionPercentage}%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${mission.completionPercentage}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-[#8E2C4B] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
