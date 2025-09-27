import { createApp } from './app.js';
import { config } from './config/index.js';
import { closeBrowser } from './lib/playwright.js';

const app = createApp();
const server = app.listen(config.port, () => {
  console.log(`IG scraper listening on :${config.port}`);
});

function shutdown(sig) {
  console.log(`\n${sig} received. Shutting down...`);
  server.close(async () => {
    await closeBrowser();
    process.exit(0);
  });
}
process.on('SIGINT', () => shutdown('SIGINT'));
process.on('SIGTERM', () => shutdown('SIGTERM'));
