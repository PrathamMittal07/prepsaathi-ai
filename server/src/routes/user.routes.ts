import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { requireRole } from '../middlewares/requireRole';
import { validateRequest } from '../middlewares/validate';
import { updateUserProfileSchema } from '../validations/schemas';

const router = Router();

router.use(requireAuth);

router.get('/me', UserController.getMyProfile);
router.put('/me', validateRequest(updateUserProfileSchema), UserController.updateMyProfile);
router.get('/me/preferences', UserController.getMyPreferences);
router.put('/me/preferences', UserController.updatePreferences);

// Admin only routes
router.get('/', requireRole(['ADMIN']), UserController.searchUsers);
router.get('/:id', requireRole(['ADMIN']), UserController.getUserById);
router.put('/:id/roles', requireRole(['ADMIN']), UserController.updateUserRoles);
router.delete('/:id', requireRole(['ADMIN']), UserController.deleteUser);

export const userRoutes = router;
