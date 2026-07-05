import React from 'react';

interface ProgressBarProps {
  percentage: number;
  completed: number;
  total: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage, completed, total }) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-text-primary">Overall Progress</span>
        <span className="text-sm font-semibold text-indigo-400">{percentage}%</span>
      </div>
      <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-text-secondary text-right">
        {completed} of {total} topics completed
      </p>
    </div>
  );
};
