import { Router } from 'express';
import { CareerController } from '../controllers/career.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { geminiRateLimiter } from '../middlewares/rateLimiter';
import { validateRequest } from '../middlewares/validate';
import { coachChatSchema, updateCareerProfileSchema } from '../validations/schemas';

const router = Router();

router.use(requireAuth);

router.get('/profile', CareerController.getProfile);
router.put('/profile', validateRequest(updateCareerProfileSchema), CareerController.updateProfile);
router.post('/coach/chat', geminiRateLimiter, validateRequest(coachChatSchema), CareerController.chatWithCoach);

export const careerRoutes = router;
