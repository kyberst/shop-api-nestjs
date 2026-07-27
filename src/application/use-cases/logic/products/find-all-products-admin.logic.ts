import { ProductQueryRepository } from '@/domain/repositories/product.query.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { ProductMapper } from '@/application/mappers/product.mapper';

/**
 * Logic to find all products for administrators.
 */
export const findAllProductsAdminLogic = async (
  adminProductRepository: ProductQueryRepository,
  options?: ProductQueryOptions
): Promise<ApiResult<PaginatedData<ProductResponseDto>>> => {
  const productsResult = await adminProductRepository.findAll(options);
  
  const mappedData = ProductMapper.toResponseList(productsResult.items);

  const paginatedDto: PaginatedData<ProductResponseDto> = {
    items: mappedData,
    total: productsResult.total,
    page: productsResult.page,
    pageSize: productsResult.pageSize
  };

  return ApiResult.FromInfo(ProductResultCode.PRODUCTS_FOUND, paginatedDto);
};
