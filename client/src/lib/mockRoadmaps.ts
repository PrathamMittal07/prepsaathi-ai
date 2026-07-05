import { Roadmap, Difficulty } from '../types/roadmap';

const generateMockTopics = (startId: number, weekName: string, difficulty: Difficulty) => {
  return Array.from({ length: 3 }).map((_, i) => {
    const id = startId + i;
    return {
      id: `topic-${id}`,
      name: `${difficulty} ${weekName} Concept ${i + 1}`,
      description: `Comprehensive overview of ${weekName} concept ${i + 1} focusing on core algorithms and data structures.`,
      estimatedTime: '2 Hours',
      difficulty: difficulty,
      learningObjectives: [
        `Understand the fundamentals of ${weekName} Concept ${i + 1}`,
        'Implement basic operations and standard algorithms',
        'Analyze time and space complexity'
      ],
      recommendedResources: [
        { title: 'GeeksforGeeks Guide', url: '#' },
        { title: 'LeetCode Explore Card', url: '#' },
        { title: 'YouTube Visual Explanation', url: '#' }
      ],
      practiceProblems: [
        { title: `Easy Problem for ${weekName}`, url: '#', difficulty: 'Easy' as Difficulty },
        { title: `Medium Problem for ${weekName}`, url: '#', difficulty: 'Medium' as Difficulty }
      ],
      revisionRequired: false,
      status: 'Not Started' as const
    };
  });
};

const createMockRoadmap = (id: string, title: string, difficulty: Difficulty): Roadmap => {
  return {
    id,
    title,
    targetCompanies: ['Google', 'Microsoft', 'Amazon'],
    difficulty,
    totalTopics: 12,
    totalWeeks: 4,
    estimatedCompletionTime: '30 Days',
    dailyStudyHours: '2 Hours',
    expectedInterviewReadiness: 'High',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    weeks: [
      {
        id: 'week-1',
        title: 'Week 1: Fundamentals & Arrays',
        description: 'Master the basics of arrays, strings, and fundamental algorithms.',
        topics: generateMockTopics(100, 'Arrays', difficulty)
      },
      {
        id: 'week-2',
        title: 'Week 2: Linked Lists & Stacks',
        description: 'Deep dive into linear data structures.',
        topics: generateMockTopics(200, 'Linked Lists', difficulty)
      },
      {
        id: 'week-3',
        title: 'Week 3: Trees & Graphs',
        description: 'Understand non-linear structures and traversal algorithms.',
        topics: generateMockTopics(300, 'Trees', difficulty)
      },
      {
        id: 'week-4',
        title: 'Week 4: Dynamic Programming & Revision',
        description: 'Advanced problem solving and comprehensive revision.',
        topics: generateMockTopics(400, 'Dynamic Programming', difficulty)
      }
    ]
  };
};

export const mockRoadmaps: Record<string, Roadmap> = {
  Beginner: createMockRoadmap('roadmap-beginner', 'Beginner DSA Roadmap', 'Beginner'),
  Intermediate: createMockRoadmap('roadmap-intermediate', 'Intermediate DSA Roadmap', 'Intermediate'),
  Advanced: createMockRoadmap('roadmap-advanced', 'Advanced DSA Roadmap', 'Advanced')
};
