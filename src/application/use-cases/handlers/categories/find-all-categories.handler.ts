import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { FindAllCategoriesQuery } from '@/application/use-cases/queries/categories/find-all-categories.query';
import { findAllCategoriesLogic } from '@/application/use-cases/logic/categories/find-all-categories.logic';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';


@RequestHandler(FindAllCategoriesQuery)
export class FindAllCategoriesHandler implements IRequestHandler<FindAllCategoriesQuery, ApiResult<CategoryResponseDto[]>> {
  constructor(
    private readonly categoryRepository: CategoryRepository
  ) {}

  async handle(command: FindAllCategoriesQuery): Promise<ApiResult<CategoryResponseDto[]>> {
      return await findAllCategoriesLogic(this.categoryRepository);
  }
}
