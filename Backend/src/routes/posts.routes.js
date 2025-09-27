import { Router } from 'express';
import { getPostsController } from '../controllers/posts.controller.js';

const r = Router();
r.get('/posts/:handle', getPostsController);
export default r;
