import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { CreateCategoryRequestDto } from '@/application/dtos/request/categories/create-category.request.dto';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { CreateCategoryCommand } from '@/application/use-cases/commands/categories/create-category.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('categories')
export class CreateCategoryController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'sales')
  @Permissions('categories', 'edit')
  async create(@Body() createCategoryDto: CreateCategoryRequestDto): Promise<ApiResult<CategoryResponseDto>> {
    return this.mediator.send(new CreateCategoryCommand(createCategoryDto));
  }
}

