import { withPage } from '../lib/playwright.js';
import { fetchWebProfileInfo } from '../lib/fetcher.js';
import { normalizeProfile, normalizePosts } from '../lib/normalize.js';
import { queue } from '../utils/pqueue.js';
import { getCache, setCache } from '../utils/cache.js';
import { config } from '../config/index.js';

export async function getProfile(handle) {
  const key = `profile:${handle}`;
  const cached = getCache(key, config.cacheTtlMs);
  if (cached) return cached;

  const data = await queue.add(async () => withPage(async (page) => {
    await page.goto(`https://www.instagram.com/${handle}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const resp = await fetchWebProfileInfo(page, handle);
    if (!resp.ok) throw new Error(`IG profile error ${resp.status || resp.err || "unknown"}`);
    const user = resp.json?.data?.user;
    if (!user) throw new Error("No user JSON returned");
    return normalizeProfile(user);
  }));

  setCache(key, data);
  return data;
}

export async function getPosts(handle, limit = 10) {
  const key = `posts:${handle}:${limit}`;
  const cached = getCache(key, config.cacheTtlMs);
  if (cached) return cached;

  const items = await queue.add(async () => withPage(async (page) => {
    await page.goto(`https://www.instagram.com/${handle}/`, { waitUntil: "domcontentloaded", timeout: 30000 });
    const resp = await fetchWebProfileInfo(page, handle);
    if (!resp.ok) throw new Error(`IG posts error ${resp.status || resp.err || "unknown"}`);
    const user = resp.json?.data?.user;
    if (!user) throw new Error("No user JSON returned");
    const edges = user.edge_owner_to_timeline_media?.edges || [];
    return normalizePosts(edges, limit);
  }));

  setCache(key, items);
  return items;
}
