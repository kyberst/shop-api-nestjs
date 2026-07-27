import { describe, it, expect, vi } from 'vitest';
import { findAllProductsLogic } from '@/application/use-cases/logic/products/find-all-products.logic';
import { ProductQueryRepository } from '@/domain/repositories/product.query.repository';
import { Product } from '@/domain/entities/product.entity';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { ProductMapper } from '@/application/mappers/product.mapper';

describe('findAllProductsLogic', () => {
  it('should return all products from the repository', async () => {
    // Arrange
    const mockProducts: Product[] = [
      Product.create({ id: '1', name: 'Product 1', price: 100, category: 'Cat 1', description: 'Desc 1', imageUrl: 'img1.jpg', rating: 5, moq: 1, supplierName: 'S1', supplierCountry: 'C1', isTradeAssurance: true, isVerified: true }),
      Product.create({ id: '2', name: 'Product 2', price: 200, category: 'Cat 2', description: 'Desc 2', imageUrl: 'img2.jpg', rating: 4, moq: 2, supplierName: 'S2', supplierCountry: 'C2', isTradeAssurance: false, isVerified: false }),
    ];
    
    const mockProductQueryRepository = {
      findAll: vi.fn().mockResolvedValue({ items: mockProducts, total: mockProducts.length }),
    } as unknown as ProductQueryRepository;

    // Act
    const result = await findAllProductsLogic(mockProductQueryRepository);

    // Assert
    expect(mockProductQueryRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    
    const expectedItems = ProductMapper.toResponseList(mockProducts);
    expect(result.data).toEqual({
      items: expectedItems,
      total: mockProducts.length,
      page: undefined,
      pageSize: undefined,
    });
    expect(result.resultType).toBe(ProductResultCode.PRODUCTS_FOUND.resultType);
  });
});

