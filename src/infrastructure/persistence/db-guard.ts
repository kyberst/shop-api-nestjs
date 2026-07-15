import { Result, ok, err } from '../../shared/types/result';

/**
 * Utility to avoid repeating "if(isConnected())" everywhere.
 * Wraps database operations in a Result object.
 */
export const dbGuard = async <T>(
  service: { isConnected: () => boolean },
  action: () => Promise<T>,
): Promise<Result<T>> => {
  if (service && typeof service.isConnected === 'function' && service.isConnected()) {
    try {
      const data = await action();
      return ok(data);
    } catch (error: any) {
      return err(new Error(error?.message || 'Database operation failed'));
    }
  }
  return err(new Error('Database service is offline or unavailable'));
};
