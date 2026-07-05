import React from 'react';
import { X, Clock, Target, Book, Code, AlertCircle } from 'lucide-react';
import { Topic } from '../../types/roadmap';
import { DifficultyBadge } from './DifficultyBadge';

interface TopicDetailsModalProps {
  topic: Topic;
  onClose: () => void;
}

export const TopicDetailsModal: React.FC<TopicDetailsModalProps> = ({ topic, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-white/10 shadow-2xl relative"
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-bg-card/90 backdrop-blur-md p-6 border-b border-white/10 flex items-start justify-between z-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold font-syne text-text-primary">{topic.name}</h2>
              <DifficultyBadge difficulty={topic.difficulty} />
            </div>
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Clock className="w-4 h-4 text-indigo-400" />
              <span>Estimated Time: {topic.estimatedTime}</span>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-text-secondary hover:text-white" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Description */}
          <section>
            <p className="text-text-secondary leading-relaxed">
              {topic.description}
            </p>
          </section>

          {/* Learning Objectives */}
          <section>
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
              <Target className="w-5 h-5 text-emerald-400" />
              Learning Objectives
            </h3>
            <ul className="space-y-2">
              {topic.learningObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2 text-text-secondary bg-white/5 p-3 rounded-lg border border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 flex-shrink-0" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Resources */}
          <section>
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
              <Book className="w-5 h-5 text-blue-400" />
              Recommended Resources
            </h3>
            <div className="grid gap-3">
              {topic.recommendedResources.map((res, i) => (
                <a 
                  key={i} 
                  href={res.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all duration-200 flex items-center justify-between group"
                >
                  <span className="text-text-secondary group-hover:text-blue-300 transition-colors">{res.title}</span>
                  <span className="text-xs text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">View Resource →</span>
                </a>
              ))}
            </div>
          </section>

          {/* Practice Problems */}
          <section>
            <h3 className="text-lg font-semibold text-text-primary flex items-center gap-2 mb-4">
              <Code className="w-5 h-5 text-orange-400" />
              Practice Problems
            </h3>
            <div className="grid gap-3">
              {topic.practiceProblems.map((prob, i) => (
                <a 
                  key={i} 
                  href={prob.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 rounded-xl transition-all duration-200 flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-text-secondary group-hover:text-orange-300 transition-colors">{prob.title}</span>
                    <DifficultyBadge difficulty={prob.difficulty} className="scale-90" />
                  </div>
                  <span className="text-xs text-orange-400 opacity-0 group-hover:opacity-100 transition-opacity">Solve →</span>
                </a>
              ))}
            </div>
          </section>
          
          {topic.revisionRequired && (
            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-orange-400 font-medium">Revision Recommended</h4>
                <p className="text-sm text-text-secondary mt-1">This is a core topic that appears frequently in interviews. Make sure to revise before moving on.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
