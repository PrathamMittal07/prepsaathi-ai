import { Roadmap, FormData, Difficulty } from '../types/roadmap';
import { mockRoadmaps } from '../lib/mockRoadmaps';

export const roadmapService = {
  /**
   * Simulates generating a roadmap from a future AI backend based on user input.
   */
  generateRoadmap: async (formData: FormData): Promise<Roadmap> => {
    // In the future, this will be an API call to an AI service (e.g. OpenAI/Gemini)
    // For now, we simulate network latency and use mock data based on difficulty
    
    return new Promise((resolve) => {
      setTimeout(() => {
        let level: string = formData.currentLevel || 'Beginner';
        if (!['Beginner', 'Intermediate', 'Advanced'].includes(level)) {
            level = 'Beginner';
        }
        
        // Deep copy the mock to avoid mutating the source
        const roadmapTemplate = JSON.parse(JSON.stringify(mockRoadmaps[level])) as Roadmap;
        
        // Customizations based on user input
        roadmapTemplate.id = `roadmap-${Date.now()}`;
        roadmapTemplate.targetCompanies = formData.targetCompanies.length > 0 ? formData.targetCompanies : roadmapTemplate.targetCompanies;
        roadmapTemplate.dailyStudyHours = formData.dailyStudyTime;
        roadmapTemplate.estimatedCompletionTime = formData.preparationDuration;
        
        // Update total topics and weeks based on data
        let totalTopics = 0;
        roadmapTemplate.weeks.forEach(week => {
            totalTopics += week.topics.length;
        });
        roadmapTemplate.totalTopics = totalTopics;
        roadmapTemplate.totalWeeks = roadmapTemplate.weeks.length;

        resolve(roadmapTemplate);
      }, 1500); // 1.5 second simulated generation time
    });
  }
};
