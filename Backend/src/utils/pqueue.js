import PQueue from 'p-queue';
import { config } from '../config/index.js';

export const queue = new PQueue({
  interval: config.queueIntervalMs, // e.g., per 1000ms
  intervalCap: config.queueCap      // e.g., 2 ops per interval
});
