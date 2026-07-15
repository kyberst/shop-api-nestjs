import { ResultInfo } from '@/shared/types/result-info';

/**
 * Custom application exception that carries ResultInfo metadata.
 */
export class AppException extends Error {
  constructor(
    public readonly resultInfo: ResultInfo,
    public readonly details?: any
  ) {
    super(resultInfo.message);
    this.name = 'AppException';
  }
}
