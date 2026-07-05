import React from 'react';
import { Clock, CheckCircle2, Circle, Clock3 } from 'lucide-react';
import { Topic, TopicStatus } from '../../types/roadmap';
import { DifficultyBadge } from './DifficultyBadge';
import { useRoadmap } from '../../context/RoadmapContext';

interface TopicCardProps {
  topic: Topic;
}

export const TopicCard: React.FC<TopicCardProps> = ({ topic }) => {
  const { setActiveTopic, updateTopicStatus } = useRoadmap();

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    updateTopicStatus(topic.id, e.target.value as TopicStatus);
  };

  const getStatusIcon = () => {
    switch (topic.status) {
      case 'Completed':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'In Progress':
        return <Clock3 className="w-5 h-5 text-orange-400" />;
      default:
        return <Circle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div 
      onClick={() => setActiveTopic(topic)}
      className="p-4 bg-bg-card border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.02] rounded-xl cursor-pointer transition-all duration-200 flex items-center justify-between group shadow-sm hover:shadow-md"
    >
      <div className="flex items-start gap-4">
        <div className="mt-0.5">
          {getStatusIcon()}
        </div>
        <div>
          <h4 className="text-base font-semibold text-text-primary group-hover:text-indigo-300 transition-colors">
            {topic.name}
          </h4>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-text-secondary">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              {topic.estimatedTime}
            </div>
            <DifficultyBadge difficulty={topic.difficulty} />
          </div>
        </div>
      </div>

      <div onClick={e => e.stopPropagation()}>
        <select
          value={topic.status}
          onChange={handleStatusChange}
          className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-text-secondary focus:outline-none focus:border-indigo-500/50 appearance-none cursor-pointer hover:bg-white/10 transition-colors"
        >
          <option value="Not Started" className="bg-bg-primary">Not Started</option>
          <option value="In Progress" className="bg-bg-primary">In Progress</option>
          <option value="Completed" className="bg-bg-primary">Completed</option>
        </select>
      </div>
    </div>
  );
};
