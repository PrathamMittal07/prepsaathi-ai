import React from 'react';
import { useResume } from '../context/ResumeContext';
import { generateSkillGapIntelligence } from '../services/skillGapEngine';
import { Map, ArrowDown, PlayCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LearningPathFlow() {
  const { activeResume, targetRole } = useResume();
  const router = useRouter();

  if (!activeResume || !activeResume.parsedData) return null;

  const { recommendedLearningPath } = generateSkillGapIntelligence(activeResume.parsedData, targetRole);

  if (recommendedLearningPath.length === 0) return null;

  const handleLearnClick = (skill: string) => {
    // Navigate to roadmap and automatically open this topic in the Learning Hub
    router.push(`/dashboard/roadmap?openTopic=${encodeURIComponent(skill)}`);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-900 to-indigo-950 rounded-3xl p-8 shadow-xl relative overflow-hidden">
      <div className="absolute right-0 top-0 w-64 h-64 bg-indigo-500 rounded-full blur-3xl opacity-20 -mr-20 -mt-20 pointer-events-none" />
      
      <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2 relative z-10">
        <Map className="text-indigo-400" /> Suggested Learning Path
      </h3>
      <p className="text-indigo-200/80 text-sm mb-8 relative z-10">
        Based on your target role and current missing skills, we recommend tackling these topics in the following order.
      </p>

      <div className="space-y-2 relative z-10">
        {recommendedLearningPath.slice(0, 5).map((item: any, idx: number) => (
          <React.Fragment key={idx}>
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center justify-between group hover:bg-white/15 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-full bg-indigo-500/30 text-indigo-300 flex items-center justify-center font-black text-sm border border-indigo-400/30 shrink-0">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-white">{item.skill}</h4>
                  <p className="text-xs text-indigo-300 truncate max-w-[200px] sm:max-w-[300px]">{item.reason}</p>
                </div>
              </div>
              <button 
                onClick={() => handleLearnClick(item.skill)}
                className="w-10 h-10 rounded-xl bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-400 hover:scale-105 transition-all shadow-lg shrink-0"
                title={`Learn ${item.skill}`}
              >
                <PlayCircle size={20} />
              </button>
            </div>
            
            {idx < Math.min(recommendedLearningPath.length - 1, 4) && (
              <div className="flex justify-center py-1">
                <ArrowDown className="text-indigo-500/50" size={20} />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
