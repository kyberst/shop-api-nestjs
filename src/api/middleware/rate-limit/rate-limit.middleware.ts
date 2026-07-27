import { Injectable, NestMiddleware, Inject } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '@/domain/services/logger.service';
import { RATE_LIMIT_STORE } from '@/shared/constants/tokens';
import { rateLimitHandler } from './rate-limit.handler';
import { createRateLimiter } from '@/shared/utils/rate-limit.util';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private limiter: (req: Request, res: Response, next: NextFunction) => void;

  constructor(
    @Inject(LoggerService) private readonly logger: LoggerService,
    @Inject(RATE_LIMIT_STORE) private readonly store: any,
  ) {
    const isProduction = process.env.NODE_ENV === 'production';
    const storeInstance = typeof this.store === 'function' ? this.store('rl:mw:') : this.store;
    this.limiter = createRateLimiter({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: isProduction ? 100 : 10000,
      message: 'Too many requests, please try again later',
      handler: rateLimitHandler(this.logger),
      store: storeInstance,
    });
  }

  use(req: Request, res: Response, next: NextFunction) {
    this.limiter(req, res, next);
  }
}
