const mongoose = require('mongoose');

const roadmapProgressSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true
  },
  roadmapId: {
    type: String,
    required: true,
    default: 'default-roadmap'
  },
  completedTopics: {
    type: [String],
    default: []
  },
  inProgressTopics: {
    type: [String],
    default: []
  },
  currentWeek: {
    type: Number,
    default: 1
  },
  progressPercentage: {
    type: Number,
    default: 0
  },
  weightedProgressPercentage: {
    type: Number,
    default: 0
  },
  xp: {
    type: Number,
    default: 0
  },
  level: {
    type: Number,
    default: 1
  },
  streak: {
    type: Number,
    default: 0
  },
  lastStreakUpdate: {
    type: Date,
    default: null
  },
  currentTopicId: {
    type: String,
    default: null
  },
  completionHistory: [{
    topicId: String,
    completedAt: Date,
    timeSpent: String,
    xpEarned: Number
  }],
  personalNotes: [{
    topicId: String,
    content: String
  }],
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('RoadmapProgress', roadmapProgressSchema);
