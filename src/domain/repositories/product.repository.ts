import { Product } from '@/domain/entities/product.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PaginatedData } from '@/domain/types/paginated-data';

export interface ProductQueryOptions {
  page?: number;
  pageSize?: number;
  search?: string;
  category?: string;
  sortBy?: string;
  tradeAssurance?: boolean;
  verifiedOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  isAll?: boolean;
}

export abstract class ProductRepository {
  abstract findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>>;
  abstract findByName(name: string): Promise<Product | null>;
  abstract save(product: Product): Promise<MutationSummary>;
  abstract update(id: string, updatedFields: Partial<Product>): Promise<MutationSummary>;
  abstract delete(id: string): Promise<MutationSummary>;
}
