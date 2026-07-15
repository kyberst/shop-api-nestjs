import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { UpdateUserRoleCommand } from '@/application/use-cases/commands/users/update-user-role.command';
import { UpdateUserRoleRequestDto } from '@/application/dtos/request/users/update-user-role.request.dto';
import { ApiResult } from '@/shared/types/api-result';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class UpdateUserRoleController {
  constructor(private readonly mediator: Mediator) {}

  @Patch(':id/role')
  @Roles('admin')
  @Permissions('users', 'edit')
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleRequestDto,
  ): Promise<ApiResult<void>> {
    return this.mediator.send(new UpdateUserRoleCommand(id, dto.role));
  }
}
