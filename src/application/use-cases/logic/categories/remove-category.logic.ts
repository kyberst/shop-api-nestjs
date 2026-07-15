import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';

/**
 * Logic to delete a category.
 */
export const removeCategoryLogic = async (
  categoryRepository: CategoryRepository,
  id: string
): Promise<ApiResult> => {
  const mutation = await categoryRepository.delete(id);

  if (mutation.affectedCount === 0) {
    return ApiResult.FromInfo(CategoryResultCode.CATEGORY_NOT_FOUND);
  }

  return ApiResult.FromInfo(CategoryResultCode.CATEGORY_DELETED);
};
