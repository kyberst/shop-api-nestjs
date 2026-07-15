import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';
import { UpdateCategoryRequestDto } from '@/application/dtos/request/categories/update-category.request.dto';

/**
 * Logic to update a category.
 */
export const updateCategoryLogic = async (
  categoryRepository: CategoryRepository,
  id: string,
  updateCategoryDto: UpdateCategoryRequestDto
): Promise<ApiResult> => {
  if (updateCategoryDto.name) {
    const existingCategory = await categoryRepository.findByName(updateCategoryDto.name);
    
    if (existingCategory && existingCategory.id !== id) {
      return ApiResult.FromInfo(CategoryResultCode.CATEGORY_NAME_DUPLICATED);
    }
  }

  const mutation = await categoryRepository.update(id, updateCategoryDto.name);

  if (mutation.affectedCount === 0) {
    return ApiResult.FromInfo(CategoryResultCode.CATEGORY_NOT_FOUND);
  }

  return ApiResult.FromInfo(CategoryResultCode.CATEGORY_UPDATED);
};
