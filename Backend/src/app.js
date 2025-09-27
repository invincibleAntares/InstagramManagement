import express from 'express';
import { corsMw } from './middleware/cors.js';
import { rateLimit } from './middleware/rate-limit.js';
import { errorHandler } from './middleware/error-handler.js';
import rootRoutes from './routes/index.js';
import profileRoutes from './routes/profile.route.js';
import postsRoutes from './routes/posts.routes.js';

export function createApp() {
  const app = express();
  app.disable('x-powered-by');

  app.use(corsMw);
  app.use(express.json({ limit: '1mb' }));
  app.use(rateLimit);

  app.use('/', rootRoutes);
  app.use('/', profileRoutes);
  app.use('/', postsRoutes);

  app.use(errorHandler);
  return app;
}
