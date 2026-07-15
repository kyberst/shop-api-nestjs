import { describe, it, expect, vi } from 'vitest';
import { updateProductLogic } from '@/application/use-cases/logic/products/update-product.logic';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { UpdateProductRequestDto } from '@/application/dtos/request/products/update-product.request.dto';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

describe('updateProductLogic', () => {
  it('should update a product and return success when affected > 0', async () => {
    const mockProductRepository = {
      update: vi.fn().mockResolvedValue({ affectedCount: 1 }),
    } as unknown as ProductRepository;

    const updateDto: UpdateProductRequestDto = { price: 100 };
    const result = await updateProductLogic(mockProductRepository, '1', updateDto);

    expect(mockProductRepository.update).toHaveBeenCalledWith('1', updateDto);
    expect(result.success).toBe(true);
    expect(result.resultType).toBe(ProductResultCode.PRODUCT_UPDATED.resultType);
  });

  it('should return NOT_FOUND when affected is 0', async () => {
    const mockProductRepository = {
      update: vi.fn().mockResolvedValue({ affectedCount: 0 }),
    } as unknown as ProductRepository;

    const updateDto: UpdateProductRequestDto = { price: 100 };
    const result = await updateProductLogic(mockProductRepository, '1', updateDto);

    expect(mockProductRepository.update).toHaveBeenCalledWith('1', updateDto);
    expect(result.success).toBe(false);
    expect(result.resultType).toBe(ProductResultCode.PRODUCT_NOT_FOUND.resultType);
  });
});
