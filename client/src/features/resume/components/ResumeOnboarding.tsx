import React from 'react';
import { motion } from 'framer-motion';

export function ResumeOnboarding() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex flex-col justify-center h-full max-w-xl mx-auto lg:mx-0 w-full min-w-0 lg:min-w-[420px]"
    >
      <div className="mb-4">
        <span className="inline-block py-1.5 px-3 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-sm font-bold tracking-wide mb-6">
          Resume Intelligence
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-[48px] font-black text-gray-900 leading-[1.1] tracking-tight mb-6">
          AI Resume Analysis for Placements
        </h1>
        <p className="text-gray-600 text-lg md:text-[18px] leading-[1.8] mb-10">
          Upload once. Get ATS Score. Skill Gap. Company Match. AI Recommendations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">ATS Optimization</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">Improve your resume visibility and ranking.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.30 }}
          className="flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">Skill Gap Analysis</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">Identify missing skills and bridge the gap.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">Roadmap Generation</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">Get a personalized learning roadmap.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.60 }}
          className="flex flex-col items-start gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <span className="font-bold text-gray-900 text-sm">AI Career Readiness</span>
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">Track your readiness for top companies.</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
