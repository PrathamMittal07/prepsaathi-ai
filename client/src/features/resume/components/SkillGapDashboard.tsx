import React from 'react';
import { ReadinessMeter } from './ReadinessMeter';
import { SkillMatchBreakdown } from './SkillMatchBreakdown';
import { LearningPathFlow } from './LearningPathFlow';
import { motion } from 'framer-motion';

export function SkillGapDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 border-t border-gray-100 pt-16"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Skill Gap Intelligence</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We compared your resume against the standard requirements for your target role. 
          Here is what you are missing and exactly what you need to learn next.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SkillMatchBreakdown />
        </div>
        <div className="space-y-8">
          <ReadinessMeter />
          <LearningPathFlow />
        </div>
      </div>
    </motion.div>
  );
}
