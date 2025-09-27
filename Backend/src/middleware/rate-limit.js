const buckets = new Map();
const WINDOW_MS = 10_000; // 10s window
const MAX_REQ = 20;       // per IP per window

export function rateLimit(req, res, next) {
  const ip = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'global';
  const now = Date.now();
  const slot = Math.floor(now / WINDOW_MS);
  const key = `${ip}:${slot}`;
  const count = (buckets.get(key) || 0) + 1;
  buckets.set(key, count);
  if (count > MAX_REQ) return res.status(429).json({ error: 'Too many requests' });
  next();
}
