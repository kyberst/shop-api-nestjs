import { Product } from '@/domain/entities/product.entity';

export interface IFindByNameProductRepository {
  findByName(name: string): Promise<Product | null>;
}
