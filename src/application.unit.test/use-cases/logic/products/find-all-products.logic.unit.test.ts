import { describe, it, expect, vi } from 'vitest';
import { findAllProductsLogic } from '@/application/use-cases/logic/products/find-all-products.logic';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { Product } from '@/domain/entities/product.entity';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

describe('findAllProductsLogic', () => {
  it('should return all products from the repository', async () => {
    // Arrange
    const mockProducts: Product[] = [
      { id: '1', name: 'Product 1', price: 100, category: 'Cat 1', description: 'Desc 1', imageUrl: 'img1.jpg', rating: 5, moq: 1, supplierName: 'S1', supplierCountry: 'C1', isTradeAssurance: true, isVerified: true },
      { id: '2', name: 'Product 2', price: 200, category: 'Cat 2', description: 'Desc 2', imageUrl: 'img2.jpg', rating: 4, moq: 2, supplierName: 'S2', supplierCountry: 'C2', isTradeAssurance: false, isVerified: false },
    ];
    
    const mockProductRepository = {
      findAll: vi.fn().mockResolvedValue({ items: mockProducts, total: mockProducts.length }),
    } as unknown as ProductRepository;

    // Act
    const result = await findAllProductsLogic(mockProductRepository);

    // Assert
    expect(mockProductRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result.success).toBe(true);
    expect(result.data).toEqual({ items: mockProducts, total: mockProducts.length });
    expect(result.resultType).toBe(ProductResultCode.PRODUCTS_FOUND.resultType);
  });
});
