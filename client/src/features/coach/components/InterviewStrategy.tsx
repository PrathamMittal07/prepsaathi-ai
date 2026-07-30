import React from 'react';
import { useCareerCoach } from '../context/CareerCoachContext';
import { Mic, ArrowRight, Building2, TrendingUp } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function InterviewStrategy() {
  const router = useRouter();
  const { coachData, loading } = useCareerCoach();

  if (loading || !coachData || !coachData.interviewStrategy || !coachData.interviewStrategy.recommendedTopic) return null;
  const { interviewStrategy: strategy } = coachData;

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-[#311024] rounded-[2rem] p-8 text-white shadow-xl h-full flex flex-col relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[80px] opacity-30 -translate-y-1/2 translate-x-1/2" />
      
      <div className="flex items-center gap-3 mb-6 relative z-10">
        <Mic className="text-pink-400" size={24} />
        <h3 className="text-xl font-black tracking-tight">Interview Strategy</h3>
      </div>
      
      <div className="flex-1 flex flex-col justify-center relative z-10">
        <div className="text-[10px] font-bold uppercase tracking-widest text-indigo-300 mb-1">Recommended Interview</div>
        <div className="text-3xl font-black mb-4 leading-tight">{strategy.recommendedTopic}</div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="text-xs font-bold uppercase tracking-widest bg-white/10 text-white px-2.5 py-1 rounded-md border border-white/10">
            {strategy.difficulty}
          </span>
          <span className="text-xs font-bold uppercase tracking-widest bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-md border border-emerald-500/30 flex items-center gap-1">
            <Building2 size={12} /> {strategy.targetCompany}
          </span>
        </div>
        
        <div className="bg-black/20 rounded-xl p-4 border border-white/5 mb-6">
          <p className="text-sm font-medium text-indigo-100/90 leading-relaxed">
            {strategy.reason}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto">
          <div>
            <div className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Est. Success Rate</div>
            <div className="text-2xl font-black flex items-center gap-2">
              {strategy.estimatedSuccess}% <TrendingUp size={16} className="text-emerald-400" />
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/dashboard/interview')}
            className="w-12 h-12 rounded-full bg-white text-indigo-900 flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
