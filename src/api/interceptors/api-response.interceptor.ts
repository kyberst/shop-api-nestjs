import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IApiResponse } from '@/shared/types/api-result';
import { mapToApiResponse } from '@/shared/utils/api-response-mapper';

@Injectable()
export class ApiResponseInterceptor<T> implements NestInterceptor<T, IApiResponse<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<IApiResponse<T>> {
    const response = context.switchToHttp().getResponse();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map(data => {
        const { result, overrideStatusCode } = mapToApiResponse<T>(data, statusCode);

        if (overrideStatusCode !== undefined) {
          response.status(overrideStatusCode);
        }

        return result;
      }),
    );
  }
}

