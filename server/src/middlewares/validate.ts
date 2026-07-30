import { Request, Response, NextFunction } from 'express';
import { ZodSchema, ZodError } from 'zod';

export const validateRequest = (schema: ZodSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if ((parsedData as any).body !== undefined) {
        req.body = (parsedData as any).body;
      }
      if ((parsedData as any).query !== undefined) {
        Object.defineProperty(req, 'query', {
          value: (parsedData as any).query,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
      if ((parsedData as any).params !== undefined) {
        Object.defineProperty(req, 'params', {
          value: (parsedData as any).params,
          enumerable: true,
          configurable: true,
          writable: true
        });
      }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issues = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));
        return res.status(400).json({
          error: 'Validation failed',
          details: issues,
        });
      }
      next(error);
    }
  };
};
