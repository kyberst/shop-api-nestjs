import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';
import { UpdateProductRequestDto } from '@/application/dtos/request/products/update-product.request.dto';

/**
 * Logic to update a product.
 */
export const updateProductLogic = async (
  productRepository: ProductRepository,
  id: string,
  updateProductDto: UpdateProductRequestDto
): Promise<ApiResult> => {
  if (updateProductDto.name) {
    const existingProduct = await productRepository.findByName(updateProductDto.name);
    
    if (existingProduct && existingProduct.id !== id) {
      return ApiResult.FromInfo(ProductResultCode.PRODUCT_NAME_DUPLICATED);
    }
  }

  const mutation = await productRepository.update(id, updateProductDto);

  if (mutation.affectedCount === 0) {
    return ApiResult.FromInfo(ProductResultCode.PRODUCT_NOT_FOUND);
  }

  return ApiResult.FromInfo(ProductResultCode.PRODUCT_UPDATED);
};
