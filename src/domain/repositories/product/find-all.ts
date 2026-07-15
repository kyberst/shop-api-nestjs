import { Product } from '@/domain/entities/product.entity';
import { IApiResponse } from '@/shared/interfaces/api/api-response.interface';
import { PaginatedData } from '@/shared/interfaces/api/paginated-data.interface';

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

export interface IFindAllProductsRepository {
  findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>>;
}

