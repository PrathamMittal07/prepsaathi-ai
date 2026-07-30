import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { errorHandler } from './middlewares/errorHandler';
import { healthRoutes } from './routes/health.routes';
import { authRoutes } from './routes/auth.routes';
import { userRoutes } from './routes/user.routes';
import { fileRoutes } from './routes/file.routes';
import { careerRoutes } from './routes/career.routes';
import { resumeRoutes } from './routes/resume.routes';
import { opportunityRoutes } from './routes/opportunity.routes';
import { roadmapRoutes } from './routes/roadmap.routes';
import { recommendationRoutes } from './routes/recommendation.routes';
import { applicationRoutes } from './routes/application.routes';
import { env } from './config/env';
import cookieParser from 'cookie-parser';

const app = express();

// Trust reverse proxies (Render, Railway, Vercel, etc)
// This ensures req.ip correctly resolves the client IP instead of the Load Balancer IP.
app.set('trust proxy', 1);

// Security Middleware
app.use(helmet());

const allowedOrigins = env.NODE_ENV === 'production' 
  ? [env.CORS_ORIGIN] 
  : [env.CORS_ORIGIN, 'http://localhost:3000', 'http://127.0.0.1:3000'];

app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true 
}));

// Rate Limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message: { error: { code: 'TOO_MANY_REQUESTS', message: 'Too many requests, please try again later.' } }
});
app.use(limiter);

// Body Parser & Cookies
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cookieParser());

// Routes
app.use('/api/v1', healthRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/files', fileRoutes);
app.use('/api/v1/career', careerRoutes);
app.use('/api/v1/resumes', resumeRoutes);
app.use('/api/v1/opportunities', opportunityRoutes);
app.use('/api/v1/roadmaps', roadmapRoutes);
app.use('/api/v1/recommendations', recommendationRoutes);
app.use('/api/v1/applications', applicationRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Endpoint not found' } });
});

// Global Error Handler
app.use(errorHandler);

export default app;
