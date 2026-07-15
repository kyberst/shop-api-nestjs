import { Controller, Get, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Mediator } from '../../../infrastructure/mediator/mediator.service';
import { FindAllUsersQuery } from '../../../application/use-cases/queries/users/find-all-users.query';
import { UpdateUserRoleCommand } from '../../../application/use-cases/commands/users/update-user-role.command';
import { UpdateUserRoleRequestDto } from '../../../application/dtos/request/users/update-user-role.request.dto';
import { ApiResult } from '@/shared/types/api-result';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard)
export class UsersController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Roles('admin') // Only admin can list all users and manage roles
  async findAll() {
    return this.mediator.send(new FindAllUsersQuery());
  }

  @Patch(':id/role')
  @Roles('admin')
  async updateRole(
    @Param('id') id: string,
    @Body() dto: UpdateUserRoleRequestDto,
  ): Promise<ApiResult<void>> {
    return this.mediator.send(new UpdateUserRoleCommand(id, dto.role));
  }
}
