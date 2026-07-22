import { describe, it, expect } from 'vitest';
import { Product } from '@/domain/entities/product.entity';

describe('Product Entity', () => {
  it('should create a product correctly', () => {
    const product = new Product();
    product.id = 'prod-1';
    product.name = 'Test Product';
    product.description = 'Test Description';
    product.price = 100;
    product.imageUrl = 'image.jpg';
    product.category = 'cat-1';
    
    expect(product.id).toBe('prod-1');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
  });
});
