import { getProfile } from '../services/instagram.service.js';

export async function getProfileController(req, res, next) {
  try {
    const handle = req.params.handle.replace(/^@/, '');
    const data = await getProfile(handle);
    res.json(data);
  } catch (e) {
    next(e);
  }
}
