import React from 'react';
import { useResume } from '../context/ResumeContext';
import { evaluateAllRoles } from '../services/roleMatchingEngine';
import { motion } from 'framer-motion';
import { CheckCircle2, Target, Briefcase, ChevronRight } from 'lucide-react';

export function RoleRankingsList() {
  const { activeResume, targetRole, setTargetRole } = useResume();

  if (!activeResume || !activeResume.parsedData) return null;

  const rankings = evaluateAllRoles(activeResume.parsedData);

  const getMatchColor = (level: string) => {
    switch (level) {
      case 'Excellent Match': return 'text-green-500 bg-green-50 border-green-200';
      case 'Good Match': return 'text-blue-500 bg-blue-50 border-blue-200';
      case 'Needs Improvement': return 'text-amber-500 bg-amber-50 border-amber-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
        <Briefcase className="text-indigo-500" /> Career Path Rankings
      </h3>
      <p className="text-sm text-gray-500 mb-6">
        We evaluated your resume against 7 industry-standard engineering profiles.
      </p>

      <div className="space-y-4">
        {rankings.map((result, idx) => {
          const isTarget = targetRole === result.role.name;
          
          return (
            <motion.div
              key={result.role.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-2xl border transition-all ${isTarget ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/30' : 'border-gray-100 hover:border-indigo-200 bg-white'}`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-12 h-12 rounded-full bg-gray-50 border border-gray-200 flex items-center justify-center font-black text-gray-400 shrink-0">
                    #{idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                      {result.role.name}
                      {isTarget && <span className="bg-indigo-100 text-indigo-600 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest flex items-center gap-1"><Target size={10} /> Target</span>}
                    </h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className={`text-xs font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${getMatchColor(result.matchLevel)}`}>
                        {result.matchLevel}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">{result.commonSkills.length} Skills Matched</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <span className="block text-2xl font-black text-gray-900">{result.compatibilityScore}%</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Compatibility</span>
                  </div>
                  
                  {!isTarget && (
                    <button 
                      onClick={() => setTargetRole(result.role.name)}
                      className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 text-gray-400 hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all flex items-center justify-center shrink-0"
                      title="Set as Target Role"
                    >
                      <ChevronRight size={20} />
                    </button>
                  )}
                  {isTarget && (
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
