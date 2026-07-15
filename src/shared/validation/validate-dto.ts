import { ajv } from './ajv-instance';
import { ApiResult } from '@/shared/types/api-result';
import { ResultInfo } from '@/shared/types/result-info';

/**
 * Validates a DTO object against an AJV schema.
 * If validation fails, it returns a formatted ApiResult containing 400 Bad Request
 * and the specific field-level validation errors.
 * If validation succeeds, it returns null.
 *
 * @param schema The AJV JSON schema to validate against
 * @param data The data object to validate
 * @returns ApiResult<T> if invalid, or null if valid
 */
export function validateDto<T>(schema: object, data: unknown): ApiResult<T> | null {
  const validate = ajv.compile(schema);
  const isValid = validate(data);
  
  if (!isValid) {
    const errors = validate.errors || [];
    const errorDetails: Record<string, string> = {};
    
    errors.forEach((err) => {
      const field = err.instancePath ? err.instancePath.substring(1) : 'value';
      errorDetails[field] = err.message || 'Invalid value';
    });
    
    const validationResultInfo = ResultInfo.BadRequest('VALIDATION_FAILED', 'DTO validation failed');
    return ApiResult.FromInfo<T>(
      validationResultInfo,
      null,
      'Validation failed',
      errorDetails
    );
  }
  
  return null;
}
