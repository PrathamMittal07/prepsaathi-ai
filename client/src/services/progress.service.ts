import { Roadmap, TopicStatus, Progress } from '../types/roadmap';

export const progressService = {
  calculateProgress: (roadmap: Roadmap): Progress => {
    if (!roadmap || !roadmap.weeks) {
      return { completedTopics: 0, totalTopics: 0, percentage: 0 };
    }

    let totalTopics = 0;
    let completedTopics = 0;

    roadmap.weeks.forEach(week => {
      week.topics.forEach(topic => {
        totalTopics++;
        if (topic.status === 'Completed') {
          completedTopics++;
        }
      });
    });

    const percentage = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;

    return {
      completedTopics,
      totalTopics,
      percentage
    };
  },

  updateTopicStatus: (roadmap: Roadmap, topicId: string, newStatus: TopicStatus): Roadmap => {
    // Return a new roadmap instance to maintain immutability
    const updatedRoadmap = JSON.parse(JSON.stringify(roadmap)) as Roadmap;
    
    for (const week of updatedRoadmap.weeks) {
      const topicIndex = week.topics.findIndex(t => t.id === topicId);
      if (topicIndex !== -1) {
        week.topics[topicIndex].status = newStatus;
        if (newStatus === 'Completed') {
           week.topics[topicIndex].completedAt = new Date().toISOString();
        }
        break;
      }
    }
    
    return updatedRoadmap;
  }
};
