import { randomUUID } from 'crypto';
import { CategoryResultInfo } from '@/application/constants/result-codes/category-result-info';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';
import { CreateCategoryRequestDto } from '@/application/dtos/request/categories/create-category.request.dto';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';
import { Category } from '@/domain/entities/category.entity';
import { CategoryMapper } from '@/application/mappers/category.mapper';
import { executeRepository } from '@/application/helpers/execute-repository.helper';

/**
 * Logic to create a category with complex business rules.
 */
export async function createCategoryLogic(
  repository: CategoryRepository,
  dto: CreateCategoryRequestDto
): Promise<ApiResult<CategoryResponseDto>> {
  // RULE 1: Cannot create "Restricted" category
  if (dto.name.toLowerCase() === 'restricted') {
    return ApiResult.FromInfo(CategoryResultInfo.FORBIDDEN_RESTRICTED);
  }

  // RULE 2: Check for existing category
  const existingCategory = await repository.findByName(dto.name);
  if (existingCategory) {
    return ApiResult.FromInfo(CategoryResultCode.CATEGORY_NAME_DUPLICATED);
  }

  const category = Category.create({
    id: dto.id || randomUUID(),
    name: dto.name,
    isActive: true,
  });

  await executeRepository(
    () => repository.save(category),
    CategoryResultCode.CATEGORY_CREATION_FAILED
  );

  return ApiResult.FromInfo(CategoryResultCode.CATEGORY_CREATED, CategoryMapper.toResponse(category));
}
