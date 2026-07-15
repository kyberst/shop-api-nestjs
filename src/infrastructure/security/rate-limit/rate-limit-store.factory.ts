import { RedisStore } from 'rate-limit-redis';
import { Redis } from 'ioredis';

export const createRateLimitStore = (redisClient: Redis | null) => {
  if (!redisClient) return undefined;

  return new RedisStore({
    sendCommand: async (...args: string[]) => {
      return await (redisClient as any).call(...args);
    },
  });
};
