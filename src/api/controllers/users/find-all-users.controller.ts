import { Controller, Get, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllUsersQuery } from '@/application/use-cases/queries/users/find-all-users.query';
import { ApiResult } from '@/shared/types/api-result';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

@Controller('users')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class FindAllUsersController {
  constructor(@Inject(IMediator) private readonly mediator: IMediator) {}

  @Get()
  @Roles('admin')
  @Permissions('users', 'view')
  async findAll(): Promise<ApiResult<ISanitizedUser[]>> {
    return this.mediator.send(new FindAllUsersQuery());
  }
}
