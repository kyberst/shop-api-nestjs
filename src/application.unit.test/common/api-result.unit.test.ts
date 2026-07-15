import { describe, it, expect } from 'vitest';
import { ApiResult } from '@/shared/types/api-result';
import { HttpStatus } from '@/shared/types/http-status';

describe('ApiResult', () => {
  it('should create a success result correctly', () => {
    const data = { foo: 'bar' };
    const result = new ApiResult(true, HttpStatus.OK, 'SUCCESS', data, 'Success message');
    
    expect(result.success).toBe(true);
    expect(result.statusCode).toBe(HttpStatus.OK);
    expect(result.data).toEqual(data);
    expect(result.message).toBe('Success message');
  });

  it('should create from info correctly', () => {
    const info = { success: true, statusCode: 200, resultType: 'TYPE', message: 'Msg' };
    const result = ApiResult.FromInfo(info as any, { x: 1 });
    
    expect(result.success).toBe(true);
    expect(result.resultType).toBe('TYPE');
    expect(result.data).toEqual({ x: 1 });
  });
});
