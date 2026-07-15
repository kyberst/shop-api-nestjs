import { BaseEntity } from './base.entity';

export class Product implements BaseEntity {
  id!: string;
  createdAt?: Date;
  updatedAt?: Date;
  createdBy?: string;
  updatedBy?: string;
  name!: string;
  description!: string;
  price!: number;
  category!: string;
  imageUrl!: string;
  rating!: number;
  moq!: number;
  supplierName!: string;
  supplierCountry!: string;
  isTradeAssurance!: boolean;
  isVerified!: boolean;
  isActive?: boolean;

  static create(data: Partial<Product>): Product {
    const product = new Product();
    Object.assign(product, {
      rating: 5,
      moq: 1,
      supplierName: 'Direct Supplier',
      supplierCountry: 'China',
      isTradeAssurance: true,
      isVerified: true,
      isActive: true,
      ...data
    });
    return product;
  }
}
