import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { ajv } from '@/shared/validation/ajv-instance';
import { schemaRegistry } from '@/application/validation/schemas';
import { ValidateFunction } from 'ajv';

const compileCache = new Map<object, ValidateFunction>();

@Injectable()
export class AjvValidationPipe implements PipeTransform<object | string | number | boolean | undefined | null, object | string | number | boolean | undefined | null> {
  transform(value: object | string | number | boolean | undefined | null, metadata: ArgumentMetadata): object | string | number | boolean | undefined | null {
    const { metatype } = metadata;
    
    // If no metatype is defined or if it's not a registered DTO, skip AJV validation
    if (!metatype || !schemaRegistry[metatype.name]) {
      return value;
    }

    const schema = schemaRegistry[metatype.name];
    let validate = compileCache.get(schema);
    if (!validate) {
      validate = ajv.compile(schema);
      compileCache.set(schema, validate);
    }
    const isValid = validate(value);

    if (!isValid) {
      // Collect error messages from AJV and construct a structured error details object
      const errors = validate.errors || [];
      const errorDetails: Record<string, string> = {};
      const errorMessages = errors.map((err) => {
        const field = err.instancePath ? err.instancePath.substring(1) : 'value';
        errorDetails[field] = err.message || 'Invalid value';
        return `Field '${field}' ${err.message}`;
      });

      throw new BadRequestException({
        message: 'Validation failed',
        errors: errorDetails,
        errorMessages,
        statusCode: 400,
      });
    }

    return value;
  }
}
