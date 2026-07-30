import { Router, Request, Response } from 'express';
import { env } from '../config/env';

const router = Router();

router.get('/health', (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      status: 'UP',
      timestamp: new Date().toISOString()
    }
  });
});

router.get('/ready', (req: Request, res: Response) => {
  // In future, check DB connection here
  res.status(200).json({
    data: {
      status: 'READY'
    }
  });
});

router.get('/version', (req: Request, res: Response) => {
  res.status(200).json({
    data: {
      version: '1.0.0',
      env: env.NODE_ENV
    }
  });
});

export const healthRoutes = router;
