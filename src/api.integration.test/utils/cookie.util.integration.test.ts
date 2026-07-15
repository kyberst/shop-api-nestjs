import { describe, it, expect, vi } from 'vitest';
import { setAuthCookie, clearAuthCookie } from '../../api/utils/cookie.util';
import { Response } from 'express';

describe('cookie.util', () => {
  describe('setAuthCookie', () => {
    it('should set the auth cookie with the correct options', () => {
      const mockResponse = {
        cookie: vi.fn(),
      } as unknown as Response;

      const token = 'test-token';
      setAuthCookie(mockResponse, token);

      expect(mockResponse.cookie).toHaveBeenCalledWith('auth_token', token, expect.objectContaining({
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      }));
    });
  });

  describe('clearAuthCookie', () => {
    it('should clear the auth cookie', () => {
      const mockResponse = {
        clearCookie: vi.fn(),
      } as unknown as Response;

      clearAuthCookie(mockResponse);

      expect(mockResponse.clearCookie).toHaveBeenCalledWith('auth_token');
    });
  });
});
