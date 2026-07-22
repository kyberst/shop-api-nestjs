import { Controller, Get, Patch, Body, UseGuards, Inject } from '@nestjs/common';
import { IMediator } from '@/application/mediator/interfaces';
import { UpdateRolePermissionsRequestDto } from '@/application/dtos/request/permissions/update-role-permissions.request.dto';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { GetRolePermissionsQuery } from '@/application/use-cases/queries/permissions/get-role-permissions.query';
import { UpdateRolePermissionsCommand } from '@/application/use-cases/commands/permissions/update-role-permissions.command';
import { ApiResult } from '@/shared/types/api-result';

@Controller('role-permissions')
@UseGuards(AuthGuard)
export class RolePermissionsController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Get()
  // @Roles('admin') // We want user to be able to fetch permissions to know what they can do
  async findAll(): Promise<ApiResult<RolePermissionResponseDto[]>> {
    return this.mediator.send(new GetRolePermissionsQuery());
  }

  @Patch()
  @UseGuards(RolesGuard)
  @Roles('admin')
  async update(@Body() dto: UpdateRolePermissionsRequestDto): Promise<ApiResult<void>> {
    return this.mediator.send(new UpdateRolePermissionsCommand(dto));
  }
}
