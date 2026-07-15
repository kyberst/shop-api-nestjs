import { describe, it, expect, vi } from 'vitest';
import { BcryptAdapter } from '../../infrastructure/adapters/bcrypt.adapter';
import bcrypt from 'bcryptjs';

vi.mock('bcryptjs', () => ({
  default: {
    hash: vi.fn(),
    compare: vi.fn(),
  },
}));

describe('BcryptAdapter', () => {
  it('should hash a password', async () => {
    (bcrypt.hash as any).mockResolvedValue('hashed-password');
    const adapter = new BcryptAdapter();
    
    const result = await adapter.hash('my-password');
    
    expect(bcrypt.hash).toHaveBeenCalledWith('my-password', 10);
    expect(result).toBe('hashed-password');
  });

  it('should compare a password', async () => {
    (bcrypt.compare as any).mockResolvedValue(true);
    const adapter = new BcryptAdapter();
    
    const result = await adapter.compare('my-password', 'hashed-password');
    
    expect(bcrypt.compare).toHaveBeenCalledWith('my-password', 'hashed-password');
    expect(result).toBe(true);
  });
});
