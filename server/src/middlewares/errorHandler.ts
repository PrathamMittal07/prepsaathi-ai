import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';
import { ZodError } from 'zod';

import { AppError } from './error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      error: {
        code: 'VALIDATION_ERROR',
        message: 'Invalid request data',
        details: err.issues
      }
    });
  }

  if (err.name === 'MulterError') {
    return res.status(400).json({
      error: {
        code: 'UPLOAD_ERROR',
        message: err.message
      }
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: {
        code: 'APP_ERROR',
        message: err.message
      }
    });
  }

  logger.error(`[Unhandled Error] ${err.message}\n${err.stack}`);
  
  const fs = require('fs');
  fs.appendFileSync('error.log', new Date().toISOString() + ' - ' + err.message + '\n' + err.stack + '\n\n');

  const isProd = process.env.NODE_ENV === 'production';
  return res.status(500).json({
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isProd ? 'An unexpected error occurred. Please try again later.' : (err.message || 'Something went wrong')
    }
  });
};
