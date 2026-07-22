import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';
import { CategoryMapper } from '@/application/mappers/category.mapper';

/**
 * Logic to find all categories.
 */
export const findAllCategoriesLogic = async (
  categoryRepository: CategoryRepository
): Promise<ApiResult<CategoryResponseDto[]>> => {
  const categories = await categoryRepository.findAll();
  
  const categoriesDto = CategoryMapper.toResponseList(categories);

  return ApiResult.FromInfo(CategoryResultCode.CATEGORIES_FOUND, categoriesDto);
};
