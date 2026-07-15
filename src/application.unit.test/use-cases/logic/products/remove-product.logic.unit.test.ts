import { describe, it, expect, vi } from 'vitest';
import { removeProductLogic } from '@/application/use-cases/logic/products/remove-product.logic';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

describe('removeProductLogic', () => {
  it('should remove a product and return success when affected > 0', async () => {
    const mockProductRepository = {
      delete: vi.fn().mockResolvedValue({ affectedCount: 1 }),
    } as unknown as ProductRepository;

    const result = await removeProductLogic(mockProductRepository, '1');

    expect(mockProductRepository.delete).toHaveBeenCalledWith('1');
    expect(result.success).toBe(true);
    expect(result.resultType).toBe(ProductResultCode.PRODUCT_DELETED.resultType);
  });

  it('should return NOT_FOUND when affected is 0', async () => {
    const mockProductRepository = {
      delete: vi.fn().mockResolvedValue({ affectedCount: 0 }),
    } as unknown as ProductRepository;

    const result = await removeProductLogic(mockProductRepository, '1');

    expect(mockProductRepository.delete).toHaveBeenCalledWith('1');
    expect(result.success).toBe(false);
    expect(result.resultType).toBe(ProductResultCode.PRODUCT_NOT_FOUND.resultType);
  });
});
