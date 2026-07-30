import { Router } from 'express';
import { ResumeController } from '../controllers/resume.controller';
import { ResumeAnalysisController } from '../controllers/resume-analysis.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/upload';
import { geminiRateLimiter } from '../middlewares/rateLimiter';
import { validateRequest } from '../middlewares/validate';
import { analyzeResumeSchema, matchResumeSchema, idParamSchema } from '../validations/schemas';

const router = Router();

router.use(requireAuth);

router.post('/process', geminiRateLimiter, upload.single('file'), ResumeController.processResume);
router.get('/', ResumeController.listMyResumes);
router.get('/:id', ResumeController.getResume);
router.put('/:id', ResumeController.updateResume);
router.delete('/:id', validateRequest(idParamSchema), ResumeController.deleteResume);

router.post('/:id/primary', ResumeController.setPrimary);
router.get('/:id/versions', ResumeController.getVersions);
router.post('/:id/versions/:version/restore', ResumeController.restoreVersion);

// Analysis Routes
router.post('/:id/analyze', geminiRateLimiter, validateRequest(analyzeResumeSchema), ResumeAnalysisController.requestAnalysis);
router.get('/:id/analyze/status', ResumeAnalysisController.getAnalysisStatus);
router.get('/:id/analysis', ResumeAnalysisController.getAnalysisResult);

// Match Routes
router.post('/:id/match', geminiRateLimiter, validateRequest(matchResumeSchema), ResumeAnalysisController.requestMatch);
router.get('/:id/matches', ResumeAnalysisController.getMatches);

export const resumeRoutes = router;
