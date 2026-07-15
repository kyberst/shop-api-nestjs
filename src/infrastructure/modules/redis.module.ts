import { Module, Global } from '@nestjs/common';
import { RedisService } from '../services/cache/redis/redis.service';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';

@Global()
@Module({
  providers: [
    RedisService,
    {
      provide: CacheService,
      useExisting: RedisService,
    },
  ],
  exports: [RedisService, CacheService],
})
export class RedisModule {}
