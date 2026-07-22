import { describe, it, expect, vi, beforeEach } from 'vitest';
import { AuthCookieInterceptor } from '@/api/interceptors/auth-cookie.interceptor';
import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import * as cookieUtils from '@/api/utils/cookie.util';

vi.mock('../../api/utils/cookie.util', () => ({
  setAuthCookie: vi.fn(),
  clearAuthCookie: vi.fn(),
  handleAuthCookieFromResult: vi.fn((result, handlerName, response) => {
    if (result && result.data && result.data.token) {
      cookieUtils.setAuthCookie(response, result.data.token);
    }
    if (handlerName === 'logout') {
      cookieUtils.clearAuthCookie(response);
    }
  }),
}));

describe('AuthCookieInterceptor', () => {
  let interceptor: AuthCookieInterceptor;
  let mockContext: ExecutionContext;
  let mockResponse: any;

  beforeEach(() => {
    interceptor = new AuthCookieInterceptor();
    mockResponse = {};
    mockContext = {
      switchToHttp: () => ({
        getResponse: () => mockResponse,
      }),
      getHandler: () => ({ name: 'someHandler' } as any),
    } as unknown as ExecutionContext;
    vi.clearAllMocks();
  });

  it('should set auth cookie if result has a token', async () => {
    const mockNext = {
      handle: () => of({ success: true, data: { token: 'mock-token' } }),
    } as CallHandler;

    await new Promise<void>((resolve) => {
      interceptor.intercept(mockContext, mockNext).subscribe(() => {
        expect(cookieUtils.setAuthCookie).toHaveBeenCalledWith(mockResponse, 'mock-token');
        resolve();
      });
    });
  });

  it('should clear auth cookie if handler is logout', async () => {
    mockContext.getHandler = () => ({ name: 'logout' } as any);
    const mockNext = {
      handle: () => of({ success: true }),
    } as CallHandler;

    await new Promise<void>((resolve) => {
      interceptor.intercept(mockContext, mockNext).subscribe(() => {
        expect(cookieUtils.clearAuthCookie).toHaveBeenCalledWith(mockResponse);
        resolve();
      });
    });
  });

  it('should not do anything if no token and not logout', async () => {
    const mockNext = {
      handle: () => of({ success: true, data: { foo: 'bar' } }),
    } as CallHandler;

    await new Promise<void>((resolve) => {
      interceptor.intercept(mockContext, mockNext).subscribe(() => {
        expect(cookieUtils.setAuthCookie).not.toHaveBeenCalled();
        expect(cookieUtils.clearAuthCookie).not.toHaveBeenCalled();
        resolve();
      });
    });
  });
});
