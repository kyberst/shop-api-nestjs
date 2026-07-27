import { RedisStore } from 'rate-limit-redis';
import { Redis } from 'ioredis';

export const createRateLimitStore = (redisClient: Redis | null, prefix = 'rl:') => {
  if (!redisClient) return undefined;

  return new RedisStore({
    prefix,
    sendCommand: async (...args: string[]) => {
      return await (redisClient as any).call(...args);
    },
  });
};

