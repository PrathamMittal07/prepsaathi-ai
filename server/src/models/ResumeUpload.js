const mongoose = require('mongoose');

const resumeUploadSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  fileName: {
    type: String,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  version: {
    type: Number,
    default: 1,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // Parsing Fields
  rawText: {
    type: String,
    default: null
  },
  parsedData: {
    type: mongoose.Schema.Types.Mixed, // Stores the JSON structured resume
    default: null
  },
  aiAnalysisData: {
    type: mongoose.Schema.Types.Mixed, // Stores the Gemini AI analysis results
    default: null
  },
  parsingStatus: {
    type: String,
    enum: ['Pending', 'Extracting', 'Parsing', 'Completed', 'Failed'],
    default: 'Pending'
  },
  parsingError: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ResumeUpload', resumeUploadSchema);
