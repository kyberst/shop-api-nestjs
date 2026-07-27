import { Module, Global } from '@nestjs/common';
import { RedisService } from '@/infrastructure/services/cache/redis/redis.service';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { RATE_LIMIT_STORE } from '@/shared/constants/tokens';
import { createRateLimitStore } from '@/infrastructure/security/rate-limit/rate-limit-store.factory';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: CacheService,
      useExisting: RedisService,
    },
    {
      provide: RATE_LIMIT_STORE,
      useFactory: (cache: CacheService) => {
        return (prefix = 'rl:') => createRateLimitStore(cache.getClient(), prefix);
      },
      inject: [CacheService],
    },
  ],
  exports: [RedisService, CacheService, RATE_LIMIT_STORE],
})
export class RedisModule {}
