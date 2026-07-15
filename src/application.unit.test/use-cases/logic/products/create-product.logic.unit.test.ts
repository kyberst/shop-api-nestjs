import { describe, it, expect, vi } from 'vitest';
import { createProductLogic } from '@/application/use-cases/logic/products/create-product.logic';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

describe('createProductLogic', () => {
  it('should create a new product and return a success result', async () => {
    const mockProductRepository = {
      save: vi.fn().mockResolvedValue({ success: true }),
      findByName: vi.fn().mockResolvedValue(null),
    } as unknown as ProductRepository;

    const createDto: CreateProductRequestDto = {
      name: 'New Product',
      description: 'A great product',
      price: 99.99,
      categoryId: 'cat-1',
      image: 'image.jpg',
      sku: 'test-sku'
    };

    const result = await createProductLogic(mockProductRepository, createDto);

    expect(mockProductRepository.save).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.resultType).toBe(ProductResultCode.PRODUCT_CREATED.resultType);
    expect(result.data!.name).toBe(createDto.name);
    expect(result.data!.price).toBe(createDto.price);
  });
});
