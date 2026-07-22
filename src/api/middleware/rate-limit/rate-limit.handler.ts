import { Request, Response, NextFunction } from 'express';
import { LoggerService } from '@/domain/services/logger.service';
import { handleRateLimitResponse } from '@/shared/utils/rate-limit.util';

export const rateLimitHandler = (logger: LoggerService) => {
  return (req: Request, res: Response, next: NextFunction, options: any) => {
    handleRateLimitResponse(req, res, options, logger);
  };
};

