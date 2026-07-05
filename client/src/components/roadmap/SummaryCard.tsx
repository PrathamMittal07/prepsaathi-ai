import React from 'react';
import { Target, Clock, BookOpen, Calendar, Briefcase, Zap } from 'lucide-react';
import { Roadmap } from '../../types/roadmap';
import { DifficultyBadge } from './DifficultyBadge';

interface SummaryCardProps {
  roadmap: Roadmap;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ roadmap }) => {
  return (
    <div className="bg-bg-card border border-white/10 rounded-2xl p-6 shadow-xl relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="relative z-10">
        <h2 className="text-2xl font-bold font-syne text-text-primary mb-2">
          {roadmap.title}
        </h2>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {roadmap.targetCompanies.map(company => (
            <span key={company} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-text-secondary flex items-center gap-1.5">
              <Briefcase className="w-3 h-3 text-indigo-400" />
              {company}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Zap className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium">Difficulty</span>
            </div>
            <DifficultyBadge difficulty={roadmap.difficulty} className="mt-1 block w-max" />
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium">Total Topics</span>
            </div>
            <div className="text-xl font-bold text-text-primary mt-1">{roadmap.totalTopics}</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span className="text-sm font-medium">Duration</span>
            </div>
            <div className="text-xl font-bold text-text-primary mt-1">{roadmap.totalWeeks} Weeks</div>
          </div>

          <div className="p-4 bg-white/5 rounded-xl border border-white/5">
            <div className="flex items-center gap-2 text-text-secondary mb-1">
              <Clock className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium">Daily Study</span>
            </div>
            <div className="text-xl font-bold text-text-primary mt-1">{roadmap.dailyStudyHours}</div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/5 flex items-center gap-2 text-sm">
          <Target className="w-4 h-4 text-indigo-400" />
          <span className="text-text-secondary">Expected Interview Readiness:</span>
          <span className="text-text-primary font-semibold">{roadmap.expectedInterviewReadiness}</span>
        </div>
      </div>
    </div>
  );
};
