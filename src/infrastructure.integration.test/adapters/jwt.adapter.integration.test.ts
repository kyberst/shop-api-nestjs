import { describe, it, expect, vi } from 'vitest';
import { JwtAdapter } from '../../infrastructure/adapters/jwt.adapter';
import jwt from 'jsonwebtoken';

vi.mock('jsonwebtoken', () => ({
  default: {
    sign: vi.fn(),
    verify: vi.fn(),
  },
}));

describe('JwtAdapter', () => {
  it('should sign a payload', () => {
    (jwt.sign as any).mockReturnValue('mock-token');
    const adapter = new JwtAdapter();
    
    const result = adapter.sign({ id: '1' });
    
    expect(jwt.sign).toHaveBeenCalledWith({ id: '1' }, expect.any(String), { expiresIn: '7d' });
    expect(result).toBe('mock-token');
  });

  it('should verify a token successfully', () => {
    (jwt.verify as any).mockReturnValue({ id: '1' });
    const adapter = new JwtAdapter();
    
    const result = adapter.verify('mock-token');
    
    expect(jwt.verify).toHaveBeenCalledWith('mock-token', expect.any(String));
    expect(result).toEqual({ id: '1' });
  });

  it('should return null if verification fails', () => {
    (jwt.verify as any).mockImplementation(() => {
      throw new Error('invalid token');
    });
    const adapter = new JwtAdapter();
    
    const result = adapter.verify('invalid-token');
    
    expect(result).toBeNull();
  });
});
