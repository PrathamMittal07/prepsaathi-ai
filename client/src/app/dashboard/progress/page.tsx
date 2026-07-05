'use client'

import React from 'react';
import { useRoadmap } from '@/context/RoadmapContext';
import { SummaryCard } from '@/components/roadmap/SummaryCard';
import { ProgressBar } from '@/components/roadmap/ProgressBar';
import { WeekAccordion } from '@/components/roadmap/WeekAccordion';
import { TopicDetailsModal } from '@/components/roadmap/TopicDetailsModal';
import { progressService } from '@/services/progress.service';
import Button from '@/components/Button';
import { useRouter } from 'next/navigation';

export default function ProgressTrackerPage() {
  const { savedRoadmap, activeTopic, setActiveTopic, clearRoadmaps } = useRoadmap();
  const router = useRouter();

  if (!savedRoadmap) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] animate-fade-in-up">
        <h2 className="text-2xl font-bold font-syne text-text-primary mb-4">No Active Roadmap</h2>
        <p className="text-text-secondary mb-8">Generate a DSA Roadmap to start tracking your progress.</p>
        <Button onClick={() => router.push('/dashboard/dsa-roadmap')}>
          Generate Roadmap
        </Button>
      </div>
    );
  }

  const progress = progressService.calculateProgress(savedRoadmap);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up pb-20">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold font-syne text-text-primary tracking-tight">Progress Tracker</h1>
          <p className="mt-2 text-base text-text-secondary">Track your personalized DSA preparation journey.</p>
        </div>
        <Button variant="secondary" onClick={clearRoadmaps}>
          Reset Progress
        </Button>
      </div>

      <SummaryCard roadmap={savedRoadmap} />
      
      <div className="bg-bg-card p-6 rounded-2xl border border-white/10 shadow-lg">
        <ProgressBar percentage={progress.percentage} completed={progress.completedTopics} total={progress.totalTopics} />
      </div>

      <div className="space-y-4">
        <h3 className="text-xl font-bold font-syne text-text-primary mb-4">Your Plan</h3>
        {savedRoadmap.weeks.map((week, index) => (
          <WeekAccordion key={week.id} week={week} defaultExpanded={index === 0} />
        ))}
      </div>

      {activeTopic && (
        <TopicDetailsModal 
          topic={activeTopic} 
          onClose={() => setActiveTopic(null)} 
        />
      )}
    </div>
  );
}
