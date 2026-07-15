import { Request, Response, NextFunction } from 'express';
import { MonitoringLoggerService } from '@/infrastructure/services/monitoring/monitoring-logger.service';
import { handleRateLimitResponse } from '@/shared/utils/rate-limit.util';

export const rateLimitHandler = (logger: MonitoringLoggerService) => {
  return (req: Request, res: Response, next: NextFunction, options: any) => {
    handleRateLimitResponse(req, res, options, logger);
  };
};

