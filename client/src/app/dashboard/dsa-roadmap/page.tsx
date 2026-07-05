'use client'

import React from 'react';
import { RoadmapForm } from '@/components/roadmap/RoadmapForm';
import { RoadmapPreview } from '@/components/roadmap/RoadmapPreview';
import { TopicDetailsModal } from '@/components/roadmap/TopicDetailsModal';
import { useRoadmap } from '@/context/RoadmapContext';

export default function DSARoadmapPage() {
  const { activeTopic, setActiveTopic } = useRoadmap();

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in-up pb-20">
      <div>
        <h1 className="text-3xl font-bold font-syne text-text-primary tracking-tight">DSA Roadmap Generator</h1>
        <p className="mt-2 text-base text-text-secondary">Generate personalized DSA preparation roadmaps tailored to your target companies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 sticky top-8">
          <RoadmapForm />
        </div>
        
        <div className="lg:col-span-7">
          <RoadmapPreview />
        </div>
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
