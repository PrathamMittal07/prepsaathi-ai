import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';
import { AppError } from '../middlewares/error';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (error: any) {
      if (error.name === 'ZodError') {
        const errors = error.errors.map((err: any) => ({
          path: err.path.join('.'),
          message: err.message,
        }));
        return res.status(400).json({ error: 'Validation failed', details: errors });
      }
      return next(new AppError('Validation Error', 400));
    }
  };
};
