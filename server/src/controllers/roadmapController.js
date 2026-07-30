const RoadmapProgress = require('../models/RoadmapProgress');

// GET /api/roadmap/progress
exports.getProgress = async (req, res) => {
  try {
    // In production, extract from req.user
    // Using a mocked user ID if not authenticated for seamless demo behavior
    const userId = req.headers['x-user-id'] || 'mock-user-123';
    
    let progress = await RoadmapProgress.findOne({ userId });
    
    // Create initial state if it doesn't exist
    if (!progress) {
      progress = await RoadmapProgress.create({
        userId,
        completedTopics: [],
        inProgressTopics: [],
        currentWeek: 1,
        progressPercentage: 0,
        weightedProgressPercentage: 0,
        xp: 0,
        level: 1,
        streak: 0,
        lastStreakUpdate: null,
        currentTopicId: null,
        completionHistory: []
      });
    }

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error('Error in getProgress:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// PATCH /api/roadmap/progress
exports.updateTopicStatus = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'mock-user-123';
    const { topicId, status, totalTopics } = req.body;
    // status: 'Completed', 'In Progress', 'Not Started'
    // totalTopics: Passed from frontend to easily calculate percentage

    if (!topicId || !status) {
      return res.status(400).json({ success: false, message: 'topicId and status are required' });
    }

    let progress = await RoadmapProgress.findOne({ userId });
    if (!progress) {
      progress = new RoadmapProgress({ userId });
    }

    // Remove from both arrays first to reset
    progress.completedTopics = progress.completedTopics.filter(id => id !== topicId);
    progress.inProgressTopics = progress.inProgressTopics.filter(id => id !== topicId);

    if (status === 'Completed') {
      // Only process rewards if it wasn't already completed
      if (!progress.completedTopics.includes(topicId)) {
        progress.completedTopics.push(topicId);
        
        // --- STREAK CALCULATION ---
        const now = new Date();
        if (!progress.lastStreakUpdate) {
          progress.streak = 1;
          progress.lastStreakUpdate = now;
        } else {
          // Check if it's a new day
          const lastUpdate = new Date(progress.lastStreakUpdate);
          const diffTime = Math.abs(now - lastUpdate);
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          
          if (diffDays === 1) {
            // Consecutive day
            progress.streak += 1;
            progress.lastStreakUpdate = now;
          } else if (diffDays > 1) {
            // Missed a day
            progress.streak = 1;
            progress.lastStreakUpdate = now;
          }
          // If diffDays === 0 (same day), streak remains the same
        }

        // --- XP & WEIGHTED CALCULATION ---
        // Simple weight map for demo
        const weightMap = {
          'Arrays': 2,
          'Strings': 2,
          'Trees': 5,
          'Graphs': 6,
          'DP': 10,
          'System Design': 12
        };
        const weight = weightMap[topicId] || 3; // Default 3% weight
        
        // Add to weighted progress
        progress.weightedProgressPercentage = Math.min(100, (progress.weightedProgressPercentage || 0) + weight);
        
        // Add XP (Difficulty multiplier)
        const xpEarned = weight * 25; // e.g. weight 2 = 50 XP
        progress.xp += xpEarned;
        
        // Record History
        progress.completionHistory.push({
          topicId,
          completedAt: now,
          timeSpent: 'N/A', // Could be passed from client
          xpEarned
        });
        
        // Calculate Level (Progressive scaling: Level = floor(sqrt(XP / 100)) + 1)
        // Level 1: 0-399 XP
        // Level 2: 400-899 XP
        // Level 3: 900-1599 XP
        // Or simpler: every 500 XP is a level
        progress.level = Math.floor(progress.xp / 500) + 1;
      }
    } else if (status === 'In Progress') {
      progress.inProgressTopics.push(topicId);
      progress.currentTopicId = topicId; // Track current
    }

    // Calculate percentage
    const maxTopics = totalTopics || 36; // fallback
    progress.progressPercentage = Math.round((progress.completedTopics.length / maxTopics) * 100);

    // Auto-unlock next weeks based on percentage milestones
    const pct = progress.progressPercentage;
    if (pct >= 100) progress.currentWeek = 12;
    else if (pct >= 90) progress.currentWeek = 11;
    else if (pct >= 80) progress.currentWeek = 10;
    else if (pct >= 70) progress.currentWeek = 9;
    else if (pct >= 60) progress.currentWeek = 8;
    else if (pct >= 50) progress.currentWeek = 7;
    else if (pct >= 40) progress.currentWeek = 6;
    else if (pct >= 30) progress.currentWeek = 5;
    else if (pct >= 20) progress.currentWeek = 4;
    else if (pct >= 10) progress.currentWeek = 3;
    else if (pct >= 5) progress.currentWeek = 2;
    else progress.currentWeek = 1;

    progress.lastUpdated = Date.now();

    await progress.save();

    res.status(200).json({ success: true, data: progress });
  } catch (error) {
    console.error('Error in updateTopicStatus:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// PATCH /api/roadmap/notes
exports.saveTopicNote = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || 'mock-user-123';
    const { topicId, content } = req.body;

    if (!topicId || content === undefined) {
      return res.status(400).json({ success: false, message: 'topicId and content are required' });
    }

    let progress = await RoadmapProgress.findOne({ userId });
    if (!progress) {
      progress = new RoadmapProgress({ userId });
    }

    const noteIndex = progress.personalNotes.findIndex(n => n.topicId === topicId);
    if (noteIndex > -1) {
      progress.personalNotes[noteIndex].content = content;
    } else {
      progress.personalNotes.push({ topicId, content });
    }

    progress.lastUpdated = Date.now();
    await progress.save();

    res.status(200).json({ success: true, data: progress.personalNotes });
  } catch (error) {
    console.error('Error in saveTopicNote:', error);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};
