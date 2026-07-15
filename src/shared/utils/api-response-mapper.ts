import { ApiResult } from '../types/api-result';

export function mapToApiResponse<T>(data: unknown, defaultStatusCode: number): { result: ApiResult<T>, overrideStatusCode?: number } {
  // Detect if data itself is a response structure
  const isObject = data !== null && typeof data === 'object';
  const dataObj = isObject ? (data as Record<string, unknown>) : {};
  
  const isResponseStructure = isObject && ('message' in dataObj || 'resultType' in dataObj || 'error' in dataObj);
  
  const success = isResponseStructure && 'success' in dataObj ? Boolean(dataObj.success) : (defaultStatusCode >= 200 && defaultStatusCode < 300);
  const code = isResponseStructure && 'statusCode' in dataObj ? Number(dataObj.statusCode) : defaultStatusCode;

  let overrideStatusCode: number | undefined;
  if (isResponseStructure && 'statusCode' in dataObj && Number(dataObj.statusCode) !== defaultStatusCode) {
    overrideStatusCode = Number(dataObj.statusCode);
  }

  const resultType = isResponseStructure && 'resultType' in dataObj ? String(dataObj.resultType) : (success ? 'SUCCESS' : 'ERROR');
  const resData = isResponseStructure && 'data' in dataObj ? (dataObj.data as T) : (data !== undefined ? (data as T) : null);
  const message = isResponseStructure && 'message' in dataObj ? String(dataObj.message) : 'Request processed successfully';
  const error = isResponseStructure && 'error' in dataObj ? dataObj.error : null;

  return {
    result: new ApiResult<T>(
      success,
      code,
      resultType,
      resData,
      message,
      error,
    ),
    overrideStatusCode
  };
}
