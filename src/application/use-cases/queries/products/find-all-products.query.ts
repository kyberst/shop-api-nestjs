import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

export class FindAllProductsQuery extends IRequest<ApiResult<PaginatedData<ProductResponseDto>>> {
  constructor(public readonly options?: ProductQueryOptions) {
    super();}
}

