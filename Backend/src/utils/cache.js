// super-simple in-memory TTL cache
const store = new Map();

export function getCache(key, ttlMs) {
  const v = store.get(key);
  if (!v) return null;
  if (Date.now() - v.ts > ttlMs) {
    store.delete(key);
    return null;
  }
  return v.data;
}

export function setCache(key, data) {
  store.set(key, { data, ts: Date.now() });
}
