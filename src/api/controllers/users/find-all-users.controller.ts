import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { FindAllUsersQuery } from '@/application/use-cases/queries/users/find-all-users.query';
import { ApiResult } from '@/shared/types/api-result';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class FindAllUsersController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  @Roles('admin')
  @Permissions('users', 'view')
  async findAll(): Promise<ApiResult<ISanitizedUser[]>> {
    return this.mediator.send(new FindAllUsersQuery());
  }
}
