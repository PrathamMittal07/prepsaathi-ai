const mongoose = require('mongoose');

const resumeAnalysisSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String, // Or mock ID if we are not actually storing yet
  },
  targetRole: {
    type: String,
    default: 'Software Engineer'
  },
  scores: {
    overall: { type: Number, default: 0 },
    ats: { type: Number, default: 0 },
    roleMatch: { type: Number, default: 0 },
    readiness: { type: Number, default: 0 }
  },
  skillGap: {
    strong: [String],
    missing: [String],
    recommendedRoadmap: [{
      skill: String,
      roadmapId: String // ID to link back to roadmap
    }]
  },
  projects: [{
    name: String,
    strength: Number,
    businessImpact: String,
    technicalDepth: String,
    scalability: String,
    innovation: String,
    recommendations: [String]
  }],
  keywords: {
    present: [String],
    missing: [String],
    highPriority: [String]
  },
  sectionAnalysis: {
    summary: { score: Number, suggestions: [String], status: String },
    experience: { score: Number, suggestions: [String], status: String },
    education: { score: Number, suggestions: [String], status: String },
    projects: { score: Number, suggestions: [String], status: String },
    skills: { score: Number, suggestions: [String], status: String }
  },
  improvements: [{
    section: String,
    current: String,
    suggested: String,
    reason: String
  }],
  roleCompatibility: [{
    role: String,
    matchPercentage: Number
  }],
  uploadDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResumeAnalysis', resumeAnalysisSchema);
