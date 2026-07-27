import { Product } from '@/domain/entities/product.entity';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';

export abstract class ProductQueryRepository {
  abstract findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>>;
}
