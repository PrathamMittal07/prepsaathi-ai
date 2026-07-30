import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Check, X, ArrowRight, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

export function SkillGapAnalysis() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <BrainCircuit className="text-indigo-500" /> Skill Gap Analysis
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Strong Skills Detected</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.skillGap.strong.map((skill: any, i: number) => (
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg text-sm font-bold flex items-center gap-1.5"
              >
                <Check size={14} /> {skill}
              </motion.span>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Missing for Target Role</h4>
          <div className="flex flex-wrap gap-2">
            {analysis.skillGap.missing.map((skill: any, i: number) => (
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                key={i} 
                className="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm font-bold flex items-center gap-1.5"
              >
                <X size={14} /> {skill}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
