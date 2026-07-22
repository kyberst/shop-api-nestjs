import { Controller, Patch, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { UpdateCategoryRequestDto } from '@/application/dtos/request/categories/update-category.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { UpdateCategoryCommand } from '@/application/use-cases/commands/categories/update-category.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('categories')
export class UpdateCategoryController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'sales')
  @Permissions('categories', 'edit')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryRequestDto,
  ): Promise<ApiResult> {
    return this.mediator.send(new UpdateCategoryCommand(id, updateCategoryDto));
  }
}

