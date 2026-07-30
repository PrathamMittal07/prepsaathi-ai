import { Router } from 'express';
import { RoadmapController } from '../controllers/roadmap.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { geminiRateLimiter } from '../middlewares/rateLimiter';

const router = Router();

router.use(requireAuth);

router.post('/', geminiRateLimiter, RoadmapController.createRoadmap);
router.get('/', RoadmapController.listMyRoadmaps);
router.get('/:id', RoadmapController.getRoadmap);

router.post('/:id/missions', RoadmapController.createMission);
router.put('/:id/missions/:missionId/tasks/:taskId', RoadmapController.updateTaskStatus);

export const roadmapRoutes = router;
