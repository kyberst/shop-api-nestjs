import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { MonitoringLoggerService } from '@/infrastructure/services/monitoring/monitoring-logger.service';
import { createRateLimitStore } from '@/infrastructure/security/rate-limit/rate-limit-store.factory';
import { rateLimitHandler } from './rate-limit.handler';
import { createRateLimiter } from '@/shared/utils/rate-limit.util';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter: (req: Request, res: Response, next: NextFunction) => void;

  constructor(
    private readonly cache: CacheService,
    private readonly logger: MonitoringLoggerService,
  ) {
    const redisClient = this.cache.getClient();
    
    this.limiter = createRateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
      message: 'Too many requests, please try again later',
      handler: rateLimitHandler(this.logger),
      store: createRateLimitStore(redisClient),
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
