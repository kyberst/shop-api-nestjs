import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

/**
 * Executes a repository operation and maps any infrastructure exception to an
 * application-level AppException with the specified domain ResultInfo.
 */
export async function executeRepository<T>(
  action: () => Promise<T>,
  failureResultCode: ResultInfo
): Promise<T> {
  try {
    return await action();
  } catch (error) {
    if (error instanceof AppException) {
      throw error;
    }
    const details = error instanceof Error ? error.message : String(error);
    throw new AppException(failureResultCode, details);
  }
}
