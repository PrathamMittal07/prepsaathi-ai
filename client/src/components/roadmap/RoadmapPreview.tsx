import React from 'react';
import { useRouter } from 'next/navigation';
import { useRoadmap } from '../../context/RoadmapContext';
import { SummaryCard } from './SummaryCard';
import { WeekAccordion } from './WeekAccordion';
import { ProgressBar } from './ProgressBar';
import { progressService } from '../../services/progress.service';
import Button from '../Button';

export const RoadmapPreview: React.FC = () => {
  const { currentRoadmap, isGenerating, saveAndTrackRoadmap } = useRoadmap();
  const router = useRouter();

  if (isGenerating) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-white/10 rounded-2xl bg-bg-card">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <h3 className="text-xl font-bold font-syne text-text-primary">Generating Roadmap...</h3>
        <p className="text-text-secondary mt-2">Personalizing AI workflows for you.</p>
      </div>
    );
  }

  if (!currentRoadmap) {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[400px] border border-white/10 border-dashed rounded-2xl bg-bg-card/50">
        <h3 className="text-lg font-medium text-text-secondary">No Roadmap Generated</h3>
        <p className="text-sm text-gray-500 mt-2">Fill out the form to generate a personalized roadmap.</p>
      </div>
    );
  }

  const progress = progressService.calculateProgress(currentRoadmap);

  const handleSaveAndTrack = () => {
    saveAndTrackRoadmap();
    router.push('/dashboard/progress');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <SummaryCard roadmap={currentRoadmap} />
      
      <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-lg">
        <ProgressBar percentage={progress.percentage} completed={progress.completedTopics} total={progress.totalTopics} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold font-syne text-text-primary mb-4">Weekly Plan</h3>
        {currentRoadmap.weeks.map((week, index) => (
          <WeekAccordion key={week.id} week={week} defaultExpanded={index === 0} />
        ))}
      </div>

      <div className="flex gap-4 pt-6 mt-6 border-t border-white/10">
        <Button 
          variant="secondary" 
          className="flex-1 py-3"
          onClick={() => {
            // Trigger a re-generation using the context form data if possible,
            // or just rely on the form submit button for regeneration.
            // A simple scroll to top for now so user can click Generate again.
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          Modify Inputs
        </Button>
        <Button 
          variant="primary" 
          className="flex-1 py-3"
          onClick={handleSaveAndTrack}
        >
          Save & Start Tracking
        </Button>
      </div>
    </div>
  );
};
