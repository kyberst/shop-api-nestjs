import { Response } from 'express';

export const setAuthCookie = (response: Response, token: string) => {
  response.cookie('auth_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const clearAuthCookie = (response: Response) => {
  response.clearCookie('auth_token');
};

import { ApiResult } from '@/shared/types/api-result';

export const handleAuthCookieFromResult = (result: unknown, handlerName: string, response: Response) => {
  if (result && typeof result === 'object' && 'success' in result && 'data' in result) {
    const apiResult = result as ApiResult<{ token?: string }>;
    if (apiResult.success && apiResult.data?.token) {
      setAuthCookie(response, apiResult.data.token);
    }
  }
  
  if (handlerName === 'logout') {
    clearAuthCookie(response);
  }
};
