import { ExceptionFilter, Catch, ArgumentsHost, HttpException } from '@nestjs/common';
import { Response, Request } from 'express';
import { LoggerService } from '@/domain/services/logger.service';
import { formatErrorResponse } from '@/shared/utils/error-response.util';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {}

  catch(exception: Error | object | string | number | boolean, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    
    // Log the error
    this.logger.error(
      `Exception caught in ${request.method} ${request.url}: ${exception instanceof Error ? exception.message : String(exception)}`,
      exception instanceof Error ? exception.stack : undefined,
      'HttpExceptionFilter'
    );
    
    const apiResponse = formatErrorResponse(exception, (exc) => {
      if (exc instanceof HttpException) {
        const status = exc.getStatus();
        const res = exc.getResponse();
        let message = 'Error';
        let rawError: unknown = null;
        
        if (typeof res === 'string') {
          message = res;
        } else if (typeof res === 'object' && res !== null) {
          const obj = res as Record<string, unknown>;
          message = String(obj.message || exc.message);
          rawError = obj.errors || obj.message || obj.error || 'Error';
        }
        
        return { status, message, rawError };
      }
      return null;
    });

    response.status(apiResponse.statusCode).json(apiResponse);
  }
}
