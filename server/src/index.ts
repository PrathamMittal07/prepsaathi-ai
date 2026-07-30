import { env } from './config/env';
import app from './app';
import { logger } from './utils/logger';

const startServer = () => {
  const server = app.listen(env.PORT, () => {
    logger.info(`Server listening on port ${env.PORT} in ${env.NODE_ENV} mode`);
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err: Error) => {
    logger.error('Unhandled Rejection:', err);
    // In production, we might want to exit gracefully
    if (env.NODE_ENV === 'production') {
      server.close(() => process.exit(1));
    }
  });

  // Handle uncaught exceptions
  process.on('uncaughtException', (err: Error) => {
    logger.error('Uncaught Exception:', err);
    // Exit immediately as state might be corrupted
    if (env.NODE_ENV === 'production') {
      process.exit(1);
    }
  });
};

startServer();
