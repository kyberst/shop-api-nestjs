import { Product } from '@/domain/entities/product.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface IUpdateProductRepository {
  update(id: string, updatedFields: Partial<Product>): Promise<MutationSummary>;
}
