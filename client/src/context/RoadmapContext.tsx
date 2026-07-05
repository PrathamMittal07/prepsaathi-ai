'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Roadmap, FormData, TopicStatus, Topic } from '../types/roadmap';
import { roadmapService } from '../services/roadmap.service';
import { progressService } from '../services/progress.service';
import { storageService } from '../services/storage.service';

interface RoadmapContextType {
  // State
  currentRoadmap: Roadmap | null;
  savedRoadmap: Roadmap | null; // The one currently being tracked
  isGenerating: boolean;
  activeTopic: Topic | null;
  
  // Actions
  generateRoadmap: (formData: FormData) => Promise<void>;
  saveAndTrackRoadmap: () => void;
  updateTopicStatus: (topicId: string, status: TopicStatus) => void;
  setActiveTopic: (topic: Topic | null) => void;
  clearRoadmaps: () => void;
}

const RoadmapContext = createContext<RoadmapContextType | undefined>(undefined);

export const RoadmapProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoadmap, setCurrentRoadmap] = useState<Roadmap | null>(null);
  const [savedRoadmap, setSavedRoadmap] = useState<Roadmap | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [isClient, setIsClient] = useState(false);

  // Load from local storage on mount
  useEffect(() => {
    setIsClient(true);
    const loaded = storageService.load<Roadmap>('prepsaathi_saved_roadmap');
    if (loaded) {
      setSavedRoadmap(loaded);
    }
  }, []);

  const generateRoadmap = async (formData: FormData) => {
    setIsGenerating(true);
    try {
      const generated = await roadmapService.generateRoadmap(formData);
      setCurrentRoadmap(generated);
    } catch (error) {
      console.error('Error generating roadmap', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const saveAndTrackRoadmap = () => {
    if (currentRoadmap) {
      setSavedRoadmap(currentRoadmap);
      storageService.save('prepsaathi_saved_roadmap', currentRoadmap);
    }
  };

  const updateTopicStatus = (topicId: string, status: TopicStatus) => {
    if (savedRoadmap) {
      const updated = progressService.updateTopicStatus(savedRoadmap, topicId, status);
      setSavedRoadmap(updated);
      storageService.save('prepsaathi_saved_roadmap', updated);
    } else if (currentRoadmap) {
      // If we are just previewing and haven't saved yet, update the preview
      const updated = progressService.updateTopicStatus(currentRoadmap, topicId, status);
      setCurrentRoadmap(updated);
    }
  };

  const clearRoadmaps = () => {
    setCurrentRoadmap(null);
    setSavedRoadmap(null);
    setActiveTopic(null);
    storageService.clear('prepsaathi_saved_roadmap');
  };

  if (!isClient) {
     return null; // Avoid hydration mismatches
  }

  return (
    <RoadmapContext.Provider
      value={{
        currentRoadmap,
        savedRoadmap,
        isGenerating,
        activeTopic,
        generateRoadmap,
        saveAndTrackRoadmap,
        updateTopicStatus,
        setActiveTopic,
        clearRoadmaps
      }}
    >
      {children}
    </RoadmapContext.Provider>
  );
};

export const useRoadmap = () => {
  const context = useContext(RoadmapContext);
  if (context === undefined) {
    throw new Error('useRoadmap must be used within a RoadmapProvider');
  }
  return context;
};
