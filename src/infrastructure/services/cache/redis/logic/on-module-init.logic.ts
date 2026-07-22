import { Logger } from '@nestjs/common';
import { Redis } from 'ioredis';

export const onModuleInitLogic = (logger: Logger): Redis | undefined => {
  const url = process.env.REDIS_URL;
  if (!url) {
    logger.warn('REDIS_URL not found in environment variables. Redis features are disabled.');
    return undefined;
  }

  try {
    const client = new Redis(url, {
      maxRetriesPerRequest: 3,
    });

    client.on('connect', () => logger.log('Redis client connected'));
    client.on('error', (err) => logger.error(`Redis client error: ${err.message}`));
    
    return client;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error(`Failed to initialize Redis: ${message}`);
    return undefined;
  }
};
