import { chromium } from 'playwright';
import { config } from '../config/index.js';

let browserPromise = null;
async function ensureBrowser() {
  if (!browserPromise) {
    browserPromise = chromium.launch({ headless: true });
  }
  return browserPromise;
}

// helper to run a function with a fresh context/page
export async function withPage(fn) {
  const browser = await ensureBrowser();
  const ctx = await browser.newContext({
    userAgent: config.userAgent,
    locale: config.locale,
    storageState: config.storageState || undefined
  });
  const page = await ctx.newPage();
  try {
    return await fn(page);
  } finally {
    await ctx.close();
  }
}

export async function closeBrowser() {
  if (browserPromise) {
    const b = await browserPromise;
    await b.close();
    browserPromise = null;
  }
}
