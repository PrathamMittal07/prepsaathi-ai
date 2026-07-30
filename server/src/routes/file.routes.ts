import { Router } from 'express';
import { FileController } from '../controllers/file.controller';
import { requireAuth } from '../middlewares/requireAuth';
import { upload } from '../middlewares/upload';

const router = Router();

router.use(requireAuth);

router.post('/upload', upload.single('file'), FileController.uploadFile);
router.get('/', FileController.listFiles);
router.delete('/:id', FileController.deleteFile);

export const fileRoutes = router;
