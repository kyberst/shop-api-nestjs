import { Product } from '@/domain/entities/product.entity';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';

export abstract class AdminProductRepository {
  abstract findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>>;
}
