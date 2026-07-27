import { Request, Response, NextFunction } from 'express';
import { rateLimit, ipKeyGenerator } from 'express-rate-limit';

export interface RateLimitOptions {
  statusCode: number;
  message: string;
}

export interface LoggerInterface {
  warn(message: string, context?: string): void;
}

export interface CreateRateLimiterConfig {
  windowMs?: number;
  max?: number;
  message?: string;
  store?: unknown;
  handler: (req: Request, res: Response, next: NextFunction, options: RateLimitOptions) => void;
}

/**
 * Standard key generator that respects logged-in user IDs before falling back to headers or IP.
 */
export const rateLimitKeyGenerator = (req: Request): string => {
  const customReq = req as Request & { user?: { id?: string } };
  if (customReq.user?.id) {
    return customReq.user.id;
  }

  const clientKey = req.header('X-Client-ID');
  if (clientKey) {
    return clientKey;
  }

  // If no user or client key is present, fallback to the client IP address using the express-rate-limit helper for IPv6 validation
  const ip = req.ip || 'anonymous';
  return ipKeyGenerator(ip);
};

/**
 * Shared logic to handle rate limit exceeded events, log warnings, and send standardized 429 responses.
 */
export const handleRateLimitResponse = (
  req: Request,
  res: Response,
  options: RateLimitOptions,
  logger: LoggerInterface
): void => {
  const customReq = req as Request & { rateLimit?: { key?: string } };
  const key = customReq.rateLimit?.key || req.ip;
  logger.warn(`Rate limit exceeded for [${key}] on path: ${req.path}`, 'RateLimit');
  res.status(options.statusCode).send({
    success: false,
    statusCode: options.statusCode,
    message: options.message,
    error: 'Too Many Requests'
  });
};

/**
 * Helper to build a standard rate limiter instance with the custom key generator.
 */
export const createRateLimiter = (config: CreateRateLimiterConfig) => {
  return rateLimit({
    windowMs: config.windowMs ?? 15 * 60 * 1000, // 15 minutes
    max: config.max ?? 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: config.message ?? 'Too many requests, please try again later',
    keyGenerator: rateLimitKeyGenerator,
    handler: config.handler as unknown as undefined,
    store: typeof config.store === 'function' ? (config.store as () => unknown)() as unknown as import('express-rate-limit').Store : config.store as unknown as import('express-rate-limit').Store,
    validate: {
      trustProxy: false,
      xForwardedForHeader: false,
    },
  });
};
