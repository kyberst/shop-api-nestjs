import { Injectable } from '@nestjs/common';
import { IPipelineBehavior } from './interfaces';
import { validateDto } from '@/shared/validation/validate-dto';

export const REQUEST_SCHEMA_METADATA = 'REQUEST_SCHEMA_METADATA';

/**
 * Decorator to attach a validation schema to a Request/Command/Query class.
 */
export function ValidateRequest(schema: object) {
  return (target: any) => {
    Reflect.defineMetadata(REQUEST_SCHEMA_METADATA, schema, target);
  };
}

@Injectable()
export class ValidationBehavior implements IPipelineBehavior {
  async handle(request: any, next: () => Promise<any>): Promise<any> {
    if (!request || !request.constructor) {
      return next();
    }

    const schema = Reflect.getMetadata(REQUEST_SCHEMA_METADATA, request.constructor);
    if (schema) {
      // Validate either request.dto (if exists) or the request itself
      const dataToValidate = request.dto !== undefined ? request.dto : request;
      const validationError = validateDto(schema, dataToValidate);
      
      if (validationError) {
        return validationError;
      }
    }

    return next();
  }
}
