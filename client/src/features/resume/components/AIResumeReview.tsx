import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useResume } from '../context/ResumeContext';
import { analyzeResumeWithAI } from '../services/resumeDataService';
import { useUserProfile } from '../../profile/context/UserProfileContext';
import { Sparkles, AlertCircle, CheckCircle, ChevronDown, ChevronUp, Bot, FileText, Target, AlertTriangle, Zap, Briefcase, GraduationCap } from 'lucide-react';

export function AIResumeReview() {
  const { activeResume } = useResume();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const aiData = activeResume?.aiAnalysisData;

  if (!activeResume?.parsedData) return null;



  if (!aiData) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        className="w-full mt-16 mb-8 bg-yellow-50 rounded-[2rem] p-8 border border-yellow-200 flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left"
      >
        <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center shrink-0">
          <AlertTriangle className="text-yellow-600" size={32} />
        </div>
        <div>
          <h4 className="font-black text-yellow-800 text-2xl mb-2 tracking-tight">AI Review Unavailable</h4>
          <p className="text-yellow-700 text-lg leading-relaxed">
            Our premium AI reviewer was unable to process your resume. You can still use the basic heuristics dashboard above.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="w-full mt-16 mb-16"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white">
          <Sparkles size={24} />
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">AI Resume Review</h2>
      </div>

      {/* AI Score & Summary Card */}
      <div className="saas-card p-8 md:p-12 mb-8 flex flex-col lg:flex-row gap-10 items-start">
        <div className="flex flex-col items-center justify-center shrink-0 w-full lg:w-56 bg-gradient-to-b from-indigo-50 to-white rounded-3xl border border-indigo-100 p-8">
          <div className="text-6xl font-black text-indigo-600 mb-3">{aiData.scores?.overall || 0}</div>
          <div className="text-sm font-black text-indigo-900/50 uppercase tracking-widest text-center">AI Fit Score</div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-2xl font-black text-gray-900 mb-4 flex items-center gap-3">
            <Bot className="text-indigo-500" size={24} /> Executive Summary
          </h3>
          <p className="text-gray-600 leading-[1.8] text-[17px]">
            {aiData.summary}
          </p>
        </div>
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-green-50/50 rounded-[2rem] p-8 md:p-10 border border-green-100">
          <h4 className="text-xl font-black text-green-800 mb-8 flex items-center gap-3">
            <CheckCircle className="text-green-500" size={24} /> Top Strengths
          </h4>
          <ul className="space-y-5">
            {aiData.strengths?.map((str: string, i: number) => (
              <li key={i} className="flex gap-4 text-green-900/80">
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-green-500"></span>
                <span className="leading-[1.8] text-[15px]">{str}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-orange-50/50 rounded-[2rem] p-8 md:p-10 border border-orange-100">
          <h4 className="text-xl font-black text-orange-800 mb-8 flex items-center gap-3">
            <AlertCircle className="text-orange-500" size={24} /> Areas for Improvement
          </h4>
          <ul className="space-y-5">
            {aiData.weaknesses?.map((wk: string, i: number) => (
              <li key={i} className="flex gap-4 text-orange-900/80">
                <span className="shrink-0 mt-1.5 w-2 h-2 rounded-full bg-orange-500"></span>
                <span className="leading-[1.8] text-[15px]">{wk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Collapsible Section Feedback */}
      {aiData.sectionFeedback && (
        <div className="saas-card overflow-hidden mb-8">
          <div className="p-8 md:p-10 border-b border-gray-100 bg-gray-50/50">
            <h3 className="text-2xl font-black text-gray-900 tracking-tight">Section-by-Section AI Feedback</h3>
          </div>
          <div className="divide-y divide-gray-100 p-4">
            {Object.entries(aiData.sectionFeedback).map(([section, feedback]: [string, any]) => {
              const isExpanded = expandedSection === section;
              return (
                <div key={section} className="p-2">
                  <button 
                    onClick={() => setExpandedSection(isExpanded ? null : section)}
                    className="w-full flex items-center justify-between p-6 rounded-2xl hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-900 capitalize text-lg">{section}</span>
                    </div>
                    {isExpanded ? <ChevronUp className="text-gray-400" /> : <ChevronDown className="text-gray-400" />}
                  </button>
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 md:p-8 pt-0 text-gray-600 leading-[1.8] text-[15px] bg-indigo-50/30 rounded-2xl mx-6 mb-6 border border-indigo-50/50">
                          {feedback}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-[2rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-indigo-900/20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
        <h3 className="text-2xl md:text-3xl font-black mb-8 flex items-center gap-4 relative z-10 tracking-tight">
          <Zap className="text-yellow-400" size={32} fill="currentColor" /> Top Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
          {aiData.topRecommendations?.map((rec: string, i: number) => (
            <div key={i} className="bg-white/10 backdrop-blur-md rounded-[1.5rem] p-8 border border-white/10 hover:bg-white/15 transition-colors">
              <span className="text-indigo-200 font-bold mb-3 block text-[13px] uppercase tracking-widest">Step {i + 1}</span>
              <p className="text-white/90 leading-[1.8] text-[15px]">{rec}</p>
            </div>
          ))}
        </div>
      </div>

    </motion.div>
  );
}
