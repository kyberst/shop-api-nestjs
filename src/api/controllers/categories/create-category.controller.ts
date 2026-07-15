import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CreateCategoryRequestDto } from '@/application/dtos/request/categories/create-category.request.dto';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { CreateCategoryCommand } from '@/application/use-cases/commands/categories/create-category.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('categories')
export class CreateCategoryController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'sales')
  @Permissions('categories', 'edit')
  async create(@Body() createCategoryDto: CreateCategoryRequestDto): Promise<ApiResult<CategoryResponseDto>> {
    return this.mediator.send(new CreateCategoryCommand(createCategoryDto));
  }
}

