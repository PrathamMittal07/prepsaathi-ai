import { Router } from 'express';
import { ApplicationController } from '../controllers/application.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { validateRequest } from '../middlewares/validate';
import { idParamSchema } from '../validations/schemas';

const router = Router();

router.use(requireAuth);

router.get('/', ApplicationController.listApplications);
router.post('/', ApplicationController.createApplication);
router.patch('/:id', validateRequest(idParamSchema), ApplicationController.updateApplication);
router.delete('/:id', ApplicationController.deleteApplication);

export const applicationRoutes = router;
