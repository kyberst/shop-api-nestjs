import { Controller, Get, Inject } from '@nestjs/common';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllCategoriesQuery } from '@/application/use-cases/queries/categories/find-all-categories.query';
import { ApiResult } from '@/shared/types/api-result';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

@Controller('categories')
export class FindAllCategoriesController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Get()
  async findAll(): Promise<ApiResult<CategoryResponseDto[]>> {
    return this.mediator.send(new FindAllCategoriesQuery());
  }
}

