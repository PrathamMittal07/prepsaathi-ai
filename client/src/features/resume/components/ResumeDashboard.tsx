import React from 'react';
import { useResume } from '../context/ResumeContext';
import { Target, CheckCircle, AlertTriangle, ChevronRight, Activity, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export function ResumeDashboard() {
  const { analysis } = useResume();

  if (!analysis) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-indigo-200 transition-colors">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-50 rounded-full group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-indigo-500 mb-2">
            <Target size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Overall Score</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-gray-900">{analysis.scores.overall}</span>
            <span className="text-gray-400 mb-1 font-bold">/ 100</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-200 transition-colors">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-emerald-500 mb-2">
            <CheckCircle size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">ATS Match</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-gray-900">{analysis.scores.ats}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-blue-200 transition-colors">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-blue-500 mb-2">
            <FileText size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Role Fit</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-gray-900">{analysis.scores.roleMatch}%</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col justify-between relative overflow-hidden group hover:border-orange-200 transition-colors">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-110 transition-transform" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-orange-500 mb-2">
            <Activity size={18} />
            <span className="text-xs font-bold uppercase tracking-widest">Readiness</span>
          </div>
          <div className="flex items-end gap-2">
            <span className="text-5xl font-black text-gray-900">{analysis.scores.readiness}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
