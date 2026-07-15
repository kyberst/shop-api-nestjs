import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Response } from 'express';
import { handleAuthCookieFromResult } from '../utils/cookie.util';

@Injectable()
export class AuthCookieInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      tap((result: unknown) => {
        const response = context.switchToHttp().getResponse<Response>();
        const handlerName = context.getHandler().name;
        
        handleAuthCookieFromResult(result, handlerName, response);
      }),
    );
  }
}
