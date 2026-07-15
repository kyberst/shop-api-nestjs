import { Controller, Get, UseGuards } from '@nestjs/common';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { FindAllCategoriesQuery } from '@/application/use-cases/queries/categories/find-all-categories.query';
import { ApiResult } from '@/shared/types/api-result';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

@Controller('categories')
export class FindAllCategoriesController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Permissions('categories', 'view')
  async findAll(): Promise<ApiResult<CategoryResponseDto[]>> {
    return this.mediator.send(new FindAllCategoriesQuery());
  }
}
