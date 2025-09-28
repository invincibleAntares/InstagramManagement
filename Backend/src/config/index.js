import 'dotenv/config';

export const config = {
  port: Number(process.env.PORT || 3000),
  cacheTtlMs: Number(process.env.CACHE_TTL_MS || 5 * 60 * 1000),
  queueIntervalMs: Number(process.env.QUEUE_INTERVAL_MS || 1000),
  queueCap: Number(process.env.QUEUE_CAP || 2),
  userAgent: process.env.USER_AGENT || "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123 Safari/537.36",
  locale: process.env.LOCALE || "en-US",
  storageState: process.env.STORAGE_STATE || null, // path or null
};
