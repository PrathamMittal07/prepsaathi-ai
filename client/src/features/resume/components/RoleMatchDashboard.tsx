import React from 'react';
import { CareerRecommendationCard } from './CareerRecommendationCard';
import { RoleRankingsList } from './RoleRankingsList';
import { RoleComparisonTool } from './RoleComparisonTool';
import { motion } from 'framer-motion';

export function RoleMatchDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-16 border-t border-gray-100 pt-16"
    >
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Role Matching Engine</h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          We analyzed your resume against multiple industry profiles. Discover your most compatible career paths, compare different roles, and select your target to automatically update your skill gap analysis.
        </p>
      </div>

      <CareerRecommendationCard />
      
      <RoleRankingsList />

      <RoleComparisonTool />
    </motion.div>
  );
}
