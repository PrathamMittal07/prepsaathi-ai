import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import { Request, Response } from 'express';

// Limit Gemini API calls to 50 requests per hour per user
export const geminiRateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 50, // limit each user to 50 requests per windowMs
  keyGenerator: (req: Request, res: Response) => {
    return req.user?.id || 'unknown';
  },
  message: {
    error: 'Too many AI requests from this account, please try again after an hour'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
