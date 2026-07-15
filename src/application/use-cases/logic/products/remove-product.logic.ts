import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

/**
 * Logic to delete a product.
 */
export const removeProductLogic = async (
  productRepository: ProductRepository,
  id: string
): Promise<ApiResult> => {
  const mutation = await productRepository.delete(id);

  if (mutation.affectedCount === 0) {
    return ApiResult.FromInfo(ProductResultCode.PRODUCT_NOT_FOUND);
  }

  return ApiResult.FromInfo(ProductResultCode.PRODUCT_DELETED);
};
