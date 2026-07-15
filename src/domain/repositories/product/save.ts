import { Product } from '@/domain/entities/product.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface ISaveProductRepository {
  save(product: Product): Promise<MutationSummary>;
}
