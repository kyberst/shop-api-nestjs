import { describe, it, expect } from 'vitest';
import { Product } from '@/domain/entities/product.entity';

describe('Product Entity', () => {
  it('should create a product correctly using static create', () => {
    const product = Product.create({
      id: 'prod-1',
      name: 'Test Product',
      description: 'Test Description',
      price: 100,
      imageUrl: 'image.jpg',
      category: 'cat-1',
    });
    
    expect(product.id).toBe('prod-1');
    expect(product.name).toBe('Test Product');
    expect(product.price).toBe(100);
  });

  it('should default the category to "General" if not provided', () => {
    const product = Product.create({
      id: 'prod-1-no-cat',
      name: 'No Category Product',
      price: 50,
    });

    expect(product.category).toBe('General');
  });

  it('should throw an error if instantiated with a negative price', () => {
    expect(() => {
      Product.create({
        id: 'prod-2',
        name: 'Negative Product',
        price: -10,
        category: 'cat-1',
      });
    }).toThrow('Product price cannot be negative');
  });

  it('should apply discount correctly', () => {
    const product = Product.create({
      id: 'prod-3',
      name: 'Discounted Product',
      price: 200,
      category: 'cat-1',
    });

    product.applyDiscount(20);
    expect(product.price).toBe(160);
  });

  it('should throw error if discount is invalid', () => {
    const product = Product.create({
      id: 'prod-4',
      name: 'Invalid Discount Product',
      price: 100,
      category: 'cat-1',
    });

    expect(() => product.applyDiscount(-5)).toThrow();
    expect(() => product.applyDiscount(105)).toThrow();
  });
});
