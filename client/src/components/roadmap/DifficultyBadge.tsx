import React from 'react';
import { Difficulty } from '../../types/roadmap';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
  className?: string;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty, className = '' }) => {
  const getColors = () => {
    switch (difficulty) {
      case 'Easy':
      case 'Beginner':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Medium':
      case 'Intermediate':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Hard':
      case 'Advanced':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  return (
    <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getColors()} ${className}`}>
      {difficulty}
    </span>
  );
};
