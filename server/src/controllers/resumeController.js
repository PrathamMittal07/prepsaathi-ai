const ResumeUpload = require('../models/ResumeUpload');
const { buildStructuredResume } = require('../services/resumeParserService');

// @desc    Upload resume
// @route   POST /api/resume/upload
exports.uploadResume = async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.userId || 'mock-user-123';
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    // Deactivate previous active resumes for this user
    await ResumeUpload.updateMany({ userId, isActive: true }, { isActive: false });

    // Determine new version
    const previousUploads = await ResumeUpload.countDocuments({ userId });
    const version = previousUploads + 1;

    const newUpload = new ResumeUpload({
      userId,
      originalName: req.file.originalname,
      fileName: req.file.filename,
      mimeType: req.file.mimetype,
      size: req.file.size,
      version,
      isActive: true,
      parsingStatus: 'Pending'
    });

    await newUpload.save();

    // Trigger asynchronous parsing (don't await it so UI isn't blocked)
    buildStructuredResume(newUpload._id, req.file.path, req.file.mimetype);

    res.status(201).json({
      success: true,
      data: newUpload
    });

  } catch (error) {
    console.error(`[Upload Error] User: ${req.headers['x-user-id'] || 'unknown'}, FileSize: ${req.file?.size}, Error:`, error.stack);
    
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return res.status(503).json({ success: false, message: 'Database is currently unavailable. Please try again later.' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ success: false, message: `Validation error: ${error.message}` });
    }
    
    res.status(500).json({ success: false, message: 'Internal server error during resume upload.' });
  }
};

// @desc    Get resume history for user
// @route   GET /api/resume/history/:userId
exports.getResumeHistory = async (req, res) => {
  try {
    const userId = req.params.userId || 'mock-user-123';
    
    const history = await ResumeUpload.find({ userId }).sort({ uploadDate: -1 });

    res.status(200).json({ success: true, data: history });
  } catch (error) {
    console.error(`[Fetch History Error] User: ${req.params.userId}, Error:`, error.stack);
    
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return res.status(503).json({ success: false, message: 'Database is currently unavailable.' });
    }
    
    res.status(500).json({ success: false, message: 'Internal server error while fetching history.' });
  }
};

// @desc    Remove (soft delete) or set inactive a resume
// @route   DELETE /api/resume/:id
exports.removeResume = async (req, res) => {
  try {
    const resumeId = req.params.id;
    
    // Instead of deleting the file from disk (which we can do via fs.unlink), 
    // we will just delete the record for this ticket.
    await ResumeUpload.findByIdAndDelete(resumeId);

    res.status(200).json({ success: true, message: 'Resume removed successfully' });
  } catch (error) {
    console.error('Remove Resume Error:', error);
    res.status(500).json({ success: false, error: 'Failed to remove resume' });
  }
};

// @desc    Get parsing status
// @route   GET /api/resume/status/:id
exports.getParsingStatus = async (req, res) => {
  try {
    const resumeId = req.params.id;
    const resume = await ResumeUpload.findById(resumeId);
    
    if (!resume) {
      return res.status(404).json({ success: false, message: 'Resume not found' });
    }

    res.status(200).json({ 
      success: true, 
      data: {
        parsingStatus: resume.parsingStatus,
        parsingError: resume.parsingError,
        parsedData: resume.parsedData,
        aiAnalysisData: resume.aiAnalysisData
      }
    });
  } catch (error) {
    console.error(`[Fetch Status Error] ResumeId: ${req.params.id}, Error:`, error.stack);
    
    if (error.name === 'MongoNetworkError' || error.name === 'MongooseServerSelectionError') {
      return res.status(503).json({ success: false, message: 'Database is currently unavailable.' });
    }
    
    res.status(500).json({ success: false, message: 'Internal server error while fetching parsing status.' });
  }
};

const { analyzeResumeWithAI } = require('../services/resumeGeminiService');

// @desc    Analyze resume with AI
// @route   POST /api/resume/analyze-ai
exports.analyzeResumeAi = async (req, res) => {
  try {
    const { parsedData, targetRole, targetCompany } = req.body;

    if (!parsedData) {
      return res.status(400).json({ success: false, error: 'Missing parsed data' });
    }

    const aiAnalysis = await analyzeResumeWithAI(parsedData, targetRole, targetCompany);

    res.status(200).json({
      success: true,
      data: aiAnalysis
    });

  } catch (error) {
    console.error('AI Analysis Error:', error);
    // Graceful fallback response
    res.status(200).json({
      success: false,
      isFallback: true,
      error: 'AI Analysis currently unavailable',
      message: error.message
    });
  }
};
