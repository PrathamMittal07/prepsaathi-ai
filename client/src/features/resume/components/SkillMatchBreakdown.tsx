import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import { generateSkillGapIntelligence } from '../services/skillGapEngine';
import { CheckCircle2, XCircle, AlertCircle, Filter } from 'lucide-react';

export function SkillMatchBreakdown() {
  const { activeResume, targetRole } = useResume();
  const [filter, setFilter] = useState<'All' | 'Strong' | 'Missing'>('All');

  if (!activeResume || !activeResume.parsedData) return null;

  const { strongSkills, missingSkills } = generateSkillGapIntelligence(activeResume.parsedData, targetRole);

  const renderMissingSkill = (item: { skill: string, priority: string, reason: string }, idx: number) => (
    <div key={idx} className="bg-red-50/50 border border-red-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:border-red-200 transition-colors">
      <div className="flex items-start gap-3">
        <XCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="font-bold text-gray-900 flex items-center gap-2">
            {item.skill}
            {item.priority === 'High' && (
              <span className="bg-red-100 text-red-600 text-[10px] font-black uppercase px-2 py-0.5 rounded tracking-widest flex items-center gap-1">
                <AlertCircle size={10} /> Critical
              </span>
            )}
          </h4>
          <p className="text-xs text-red-700/70 mt-1">{item.reason}</p>
        </div>
      </div>
      <button className="text-xs font-bold bg-white text-red-600 border border-red-200 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors whitespace-nowrap shadow-sm">
        Add to Roadmap
      </button>
    </div>
  );

  return (
    <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">Skill Gap Analysis</h3>
          <p className="text-sm text-gray-500">Based on {targetRole} requirements.</p>
        </div>
        
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-200">
          {['All', 'Strong', 'Missing'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${filter === f ? 'bg-white text-indigo-600 shadow-sm border border-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {(filter === 'All' || filter === 'Strong') && strongSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <CheckCircle2 size={16} className="text-green-500" /> Strong Matches
            </h4>
            <div className="flex flex-wrap gap-2">
              {strongSkills.map((skill, idx) => (
                <span key={idx} className="bg-green-50 text-green-700 border border-green-200 px-3 py-1.5 rounded-lg text-sm font-bold">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {(filter === 'All' || filter === 'Missing') && missingSkills.length > 0 && (
          <div>
            <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2 mt-6">
              <XCircle size={16} className="text-red-500" /> Missing Requirements
            </h4>
            <div className="space-y-3">
              {missingSkills.map(renderMissingSkill)}
            </div>
          </div>
        )}

        {missingSkills.length === 0 && filter !== 'Strong' && (
          <div className="text-center p-8 bg-green-50 rounded-2xl border border-green-100">
            <CheckCircle2 className="mx-auto text-green-500 mb-2" size={32} />
            <h4 className="font-bold text-green-900">Perfect Match!</h4>
            <p className="text-sm text-green-700">Your resume contains all core skills expected for this role.</p>
          </div>
        )}
      </div>
    </div>
  );
}
