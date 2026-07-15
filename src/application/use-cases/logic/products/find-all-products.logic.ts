import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { ProductQueryOptions } from '@/domain/repositories/product.repository';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

/**
 * Logic to find all products with filters and pagination.
 */
export const findAllProductsLogic = async (
  productRepository: ProductRepository,
  options?: ProductQueryOptions
): Promise<ApiResult<PaginatedData<ProductResponseDto>>> => {
  const productsResult = await productRepository.findAll(options);
  
  const mappedData: ProductResponseDto[] = productsResult.items.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    imageUrl: product.imageUrl,
    rating: product.rating,
    moq: product.moq,
    supplierName: product.supplierName,
    supplierCountry: product.supplierCountry,
    isTradeAssurance: product.isTradeAssurance,
    isVerified: product.isVerified,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
    createdBy: product.createdBy,
    updatedBy: product.updatedBy
  }));

  const paginatedDto: PaginatedData<ProductResponseDto> = {
    items: mappedData,
    total: productsResult.total,
    page: productsResult.page,
    pageSize: productsResult.pageSize
  };

  return ApiResult.FromInfo(ProductResultCode.PRODUCTS_FOUND, paginatedDto);
};


