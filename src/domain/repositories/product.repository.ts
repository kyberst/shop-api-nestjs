import { Product } from '@/domain/entities/product.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';

export abstract class ProductRepository {
  abstract findById(id: string): Promise<Product | null>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract save(product: Product): Promise<MutationSummary>;
  abstract update(id: string, updatedFields: Partial<Product>): Promise<MutationSummary>;
  abstract delete(id: string): Promise<MutationSummary>;
}
