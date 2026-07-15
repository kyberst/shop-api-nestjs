import { validateDto } from '@/shared/validation/validate-dto';

/**
 * Method decorator that automatically validates the first argument (DTO)
 * of the method against the provided AJV schema.
 * If validation fails, it returns the validation ApiResult immediately.
 *
 * @param schema The AJV JSON schema to validate against
 */
export function ValidateDto(schema: object) {
  return function (
    target: unknown,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const dto = args[0]; // The first parameter of the method is the DTO
      const validationError = validateDto(schema, dto);
      
      if (validationError) {
        // Return the validation failure ApiResult immediately without calling the method
        return Promise.resolve(validationError);
      }
      
      return originalMethod.apply(this, args);
    };

    return descriptor;
  };
}
