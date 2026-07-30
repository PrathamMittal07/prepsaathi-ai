import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Map, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function RoadmapIntegrationCard() {
  const { analysis } = useResume();
  const router = useRouter();

  if (!analysis || analysis.skillGap.recommendedRoadmap.length === 0) return null;

  return (
    <div className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] rounded-3xl p-8 shadow-xl text-white mb-8 relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500/20 blur-3xl -mr-20 -mt-20 rounded-full pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
          <Map className="text-indigo-400" /> Roadmap Integration
        </h3>
        <p className="text-gray-400 mb-6 max-w-xl">
          Based on your resume and target role, we've identified key missing skills. Adding these to your roadmap will significantly increase your interview chances.
        </p>

        <div className="space-y-4">
          {analysis.skillGap.recommendedRoadmap.map((item: any, idx: number) => (
            <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group">
              <div>
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-widest block mb-1">Missing Skill</span>
                <span className="font-bold text-lg">{item.skill}</span>
              </div>
              <button 
                onClick={() => router.push(`/dashboard/dsa-roadmap`)} // In a real app we might link directly to the topic ID
                className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                Learn in Roadmap <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
