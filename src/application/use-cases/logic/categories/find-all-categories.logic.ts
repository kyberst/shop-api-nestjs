import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

/**
 * Logic to find all categories.
 */
export const findAllCategoriesLogic = async (
  categoryRepository: CategoryRepository
): Promise<ApiResult<CategoryResponseDto[]>> => {
  const categories = await categoryRepository.findAll();
  
  const categoriesDto: CategoryResponseDto[] = categories.map(category => ({
    id: category.id,
    name: category.name,
    isActive: category.isActive,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt
  }));

  return ApiResult.FromInfo(CategoryResultCode.CATEGORIES_FOUND, categoriesDto);
};
