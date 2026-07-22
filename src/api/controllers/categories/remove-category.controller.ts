import { Controller, Delete, Param, UseGuards, Inject } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { RemoveCategoryCommand } from '@/application/use-cases/commands/categories/remove-category.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('categories')
export class RemoveCategoryController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin')
  @Permissions('categories', 'delete')
  async remove(@Param('id') id: string): Promise<ApiResult> {
    return this.mediator.send(new RemoveCategoryCommand(id));
  }
}
