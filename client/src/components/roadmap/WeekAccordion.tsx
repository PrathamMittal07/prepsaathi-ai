import React, { useState } from 'react';
import { ChevronDown, CalendarDays } from 'lucide-react';
import { Week } from '../../types/roadmap';
import { TopicCard } from './TopicCard';

interface WeekAccordionProps {
  week: Week;
  defaultExpanded?: boolean;
}

export const WeekAccordion: React.FC<WeekAccordionProps> = ({ week, defaultExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const completedTopics = week.topics.filter(t => t.status === 'Completed').length;
  const totalTopics = week.topics.length;
  const isFullyCompleted = completedTopics === totalTopics && totalTopics > 0;

  return (
    <div className="bg-bg-card border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 shadow-sm">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full p-5 flex items-center justify-between transition-colors ${isExpanded ? 'bg-white/5' : 'hover:bg-white/[0.02]'}`}
      >
        <div className="flex items-center gap-4 text-left">
          <div className={`p-2 rounded-lg ${isFullyCompleted ? 'bg-emerald-500/10 text-emerald-400' : 'bg-indigo-500/10 text-indigo-400'}`}>
            <CalendarDays className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold font-syne text-text-primary">
              {week.title}
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {completedTopics} / {totalTopics} Topics Completed
            </p>
          </div>
        </div>
        <ChevronDown 
          className={`w-5 h-5 text-text-secondary transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
        />
      </button>

      <div 
        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
      >
        <div className="p-5 border-t border-white/5 space-y-3 bg-black/20">
          {week.description && (
            <p className="text-sm text-text-secondary mb-4 italic">
              {week.description}
            </p>
          )}
          
          <div className="space-y-3">
            {week.topics.map(topic => (
              <TopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
