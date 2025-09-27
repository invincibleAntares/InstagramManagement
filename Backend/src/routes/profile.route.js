import { Router } from 'express';
import { getProfileController } from '../controllers/profile.controller.js';

const r = Router();
r.get('/profile/:handle', getProfileController);
export default r;
