import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { RemoveCategoryCommand } from '@/application/use-cases/commands/categories/remove-category.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('categories')
export class RemoveCategoryController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('categories', 'delete')
  async remove(@Param('id') id: string): Promise<ApiResult> {
    return this.mediator.send(new RemoveCategoryCommand(id));
  }
}
