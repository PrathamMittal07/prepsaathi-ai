import { Router } from 'express';
import { OpportunityController } from '../controllers/opportunity.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { requireRole } from '../middlewares/requireRole';

const router = Router();

router.use(requireAuth);

router.get('/', OpportunityController.listOpportunities);
router.get('/:id', OpportunityController.getOpportunity);

// Admin only routes would go here with requireRole(['ADMIN'])

export const opportunityRoutes = router;
