import { AppException } from '../errors/app-exception';
import { IApiResponse } from '../types/api-result';

export interface FrameworkExceptionMap {
  status?: number;
  message?: string;
  rawError?: any;
}

export const formatErrorResponse = (
  exception: unknown,
  frameworkExceptionMapper?: (exc: any) => FrameworkExceptionMap | null
): IApiResponse<null> => {
  const isProduction = process.env.NODE_ENV === 'production';
  let status = 500;
  let message = 'Internal server error';
  let resultType = 'ERROR';
  let rawError: any = null;

  let handled = false;

  if (frameworkExceptionMapper) {
    const mapped = frameworkExceptionMapper(exception);
    if (mapped) {
      status = mapped.status || 500;
      message = mapped.message || 'Error';
      rawError = mapped.rawError || null;
      handled = true;
    }
  }

  if (!handled) {
    if (exception instanceof AppException) {
      status = exception.resultInfo.statusCode as any;
      message = exception.resultInfo.message;
      resultType = exception.resultInfo.resultType;
      rawError = exception.details || null;
    } else if (exception instanceof Error) {
      message = exception.message;
      rawError = exception.stack || exception.name;
    } else {
      message = String(exception) || 'Internal server error';
      rawError = 'InternalServerError';
    }
  }

  // Ensure error is an object as requested
  let errorObject: Record<string, any>;
  if (rawError === null || rawError === undefined) {
    errorObject = { detail: 'No additional details provided' };
  } else if (typeof rawError === 'object' && !Array.isArray(rawError)) {
    errorObject = rawError;
  } else {
    errorObject = { detail: rawError };
  }

  // Hide details in production for exceptions and AJV (BadRequestException)
  if (isProduction) {
    const isAppException = exception instanceof AppException;
    const isValidation = status === 400; // BAD_REQUEST

    if (status >= 500) {
      message = 'Internal server error';
      errorObject = { code: 'INTERNAL_SERVER_ERROR' };
    } else if (isAppException || isValidation) {
      // For specific exceptions mentioned by user, use generic message in production
      message = isValidation ? 'Validation failed' : 'An error occurred processing your request';
      errorObject = {
        code: isValidation ? 'VALIDATION_ERROR' : (resultType || 'APP_ERROR'),
        // We could include a status code here if needed, but keeping it simple as an object
      };
    }
  }

  return {
    success: false,
    statusCode: status,
    resultType: resultType || 'ERROR',
    data: null,
    message,
    error: errorObject,
  };
};
