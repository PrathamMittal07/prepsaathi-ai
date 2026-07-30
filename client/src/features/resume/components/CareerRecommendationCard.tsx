import React from 'react';
import { useResume } from '../context/ResumeContext';
import { evaluateAllRoles, getCareerRecommendation } from '../services/roleMatchingEngine';
import { Compass, Clock, Zap, ArrowRight } from 'lucide-react';

export function CareerRecommendationCard() {
  const { activeResume, setTargetRole } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const rankings = evaluateAllRoles(activeResume.parsedData);
  const recommendation = getCareerRecommendation(rankings);

  if (!recommendation) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-3xl p-8 shadow-xl relative overflow-hidden text-white mb-8">
      <div className="absolute right-0 top-0 w-64 h-64 bg-white rounded-full blur-3xl opacity-10 -mr-20 -mt-20 pointer-events-none" />
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 mb-8">
        <div>
          <span className="bg-white/20 text-indigo-50 text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest flex items-center gap-1 w-max mb-3 border border-white/10">
            <Compass size={12} /> Top AI Recommendation
          </span>
          <h2 className="text-3xl font-black mb-2">{recommendation.bestMatch.role.name}</h2>
          <p className="text-indigo-200 text-sm max-w-lg leading-relaxed">
            {recommendation.reasoning}
          </p>
        </div>
        
        <div className="bg-black/20 p-5 rounded-2xl border border-white/10 text-center min-w-[150px]">
          <span className="block text-3xl font-black mb-1">{recommendation.bestMatch.compatibilityScore}%</span>
          <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest block mb-3">Compatibility</span>
          <div className="flex justify-center">
            <span className="bg-green-500/20 text-green-300 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest">
              Excellent Match
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
        <div className="bg-white/10 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-indigo-500/30 rounded-xl text-indigo-200">
            <Zap size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Fastest Path to Interview</h4>
            <p className="text-xs text-indigo-200">You only need to master {recommendation.bestMatch.missingRequired.length} core skills.</p>
          </div>
        </div>
        
        <div className="bg-white/10 border border-white/10 p-4 rounded-2xl flex items-start gap-4">
          <div className="p-2 bg-indigo-500/30 rounded-xl text-indigo-200">
            <Clock size={20} />
          </div>
          <div>
            <h4 className="font-bold text-sm mb-1">Estimated Time</h4>
            <p className="text-xs text-indigo-200">{recommendation.timeToReady} of focused learning via Prep2Place Roadmap.</p>
          </div>
        </div>
      </div>

      <div className="mt-8 relative z-10 flex justify-end">
        <button 
          onClick={() => setTargetRole(recommendation.bestMatch.role.name)}
          className="bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 hover:bg-indigo-50 transition-colors shadow-lg"
        >
          Set as Target Role <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
