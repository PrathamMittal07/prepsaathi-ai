import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateResumeIntelligence } from '../services/resumeAnalysisEngine';
import { Layers, ChevronDown, ChevronUp, AlertCircle, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function SectionHealthBreakdown() {
  const { activeResume } = useResume();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  if (!activeResume || !activeResume.parsedData) return null;

  const { sectionHealth } = generateResumeIntelligence(activeResume.parsedData, activeResume.aiAnalysisData);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Excellent': return 'bg-green-100 text-green-700 border-green-200';
      case 'Good': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Needs Work': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Excellent':
      case 'Good': return <CheckCircle size={16} className="text-green-500" />;
      default: return <AlertCircle size={16} className={status === 'Critical' ? 'text-red-500' : 'text-amber-500'} />;
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm mb-8">
      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <Layers className="text-indigo-500" /> Section Health
      </h3>

      <div className="space-y-3">
        {sectionHealth.map((section, idx) => {
          const isExpanded = expandedSection === section.name;
          return (
            <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden hover:border-indigo-100 transition-colors">
              <button 
                onClick={() => setExpandedSection(isExpanded ? null : section.name)}
                className="w-full flex items-center justify-between p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border flex items-center gap-1.5 w-32 justify-center ${getStatusColor(section.status)}`}>
                    {getStatusIcon(section.status)} {section.status}
                  </div>
                  <h4 className="font-bold text-gray-900 text-left">{section.name}</h4>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-gray-400">{section.score}/100</span>
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-gray-400 shadow-sm border border-gray-100">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-4 border-t border-gray-100 bg-white">
                      <ul className="space-y-2">
                        {section.details.map((detail, i) => (
                          <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
