import { Router } from 'express';
import { RecommendationController } from '../controllers/recommendation.controller';
import { requireAuth } from '../middlewares/requireAuth';

const router = Router();

router.use(requireAuth);

router.get('/', RecommendationController.getRecommendations);
router.post('/generate', RecommendationController.triggerGeneration);
router.get('/insights', RecommendationController.getInsights);
router.get('/feedback', RecommendationController.getFeedback);

export const recommendationRoutes = router;
