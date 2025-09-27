import { getPosts } from '../services/instagram.service.js';

export async function getPostsController(req, res, next) {
  try {
    const handle = req.params.handle.replace(/^@/, '');
    const limit = Math.min(Number(req.query.limit || 10), 50);
    const items = await getPosts(handle, limit);
    res.json(items);
  } catch (e) {
    next(e);
  }
}
