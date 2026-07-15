import { HttpStatus } from './http-status';
import { ResultInfo } from './result-info';
import { IApiResponse } from '../interfaces/api/api-response.interface';

export { IApiResponse };

export class ApiResult<T = void> implements IApiResponse<T> {
  public readonly success: boolean;
  public readonly statusCode: HttpStatus;
  public readonly resultType: string;
  public readonly data: T | null;
  public readonly message: string;
  public readonly error: unknown;

  constructor(
    success: boolean,
    statusCode: HttpStatus,
    resultType: string,
    data: T | null,
    message: string,
    error: unknown = null,
  ) {
    this.success = success;
    this.statusCode = statusCode;
    this.resultType = resultType;
    this.data = data;
    this.message = message;
    this.error = error;
  }

  static FromInfo<T>(
    info: ResultInfo,
    data: T | null = null,
    message?: string,
    error?: unknown,
  ): ApiResult<T> {
    return new ApiResult(
      info.success,
      info.statusCode,
      info.resultType,
      data,
      message || info.message,
      error,
    );
  }
}
