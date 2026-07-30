import React from 'react';
import { motion } from 'framer-motion';
import { Activity, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function PlacementReadinessCard() {
  const router = useRouter();
  const loading = false;
  const readiness: any = { overallScore: 50, metrics: { technical: { score: 50 } }, breakdown: [] };
  if (loading || !readiness) return null;

  return (
    <div className="glass-card p-6 sm:p-8 h-full flex flex-col relative group">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Activity size={20} className="text-[#8E2C4B]" /> Readiness Dimensions
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 flex-1 content-center">
        {readiness.breakdown.map((item: any, idx: number) => (
          <div key={item.label} className="flex flex-col items-center">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 mb-3">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="#F3F4F6" strokeWidth="4" />
                <motion.circle 
                  cx="50" cy="50" r="42" fill="none" stroke={item.color} strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 263.89" }}
                  animate={{ strokeDasharray: `${(item.contributionPercentage / item.maxPercentage) * 263.89} 263.89` }}
                  transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (idx * 0.1) }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-lg sm:text-xl font-black text-gray-900 leading-none">{item.contributionPercentage}%</span>
                <span className="text-[9px] font-bold text-gray-400 uppercase">max {item.maxPercentage}%</span>
              </div>
            </div>
            <span className="text-xs font-semibold text-gray-500 text-center leading-tight h-8 flex items-center justify-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <button 
        onClick={() => router.push('/dashboard/readiness')}
        className="mt-6 w-full py-2.5 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2 text-sm relative z-10"
      >
        View Details <ArrowRight size={16} />
      </button>
    </div>
  );
}
