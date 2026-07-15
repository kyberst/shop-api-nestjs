import { Injectable } from '@nestjs/common';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { GetRolePermissionsQuery } from '@/application/use-cases/queries/permissions/get-role-permissions.query';
import { ApiResult } from '@/shared/types/api-result';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';
import { getRolePermissionsLogic } from '@/application/use-cases/logic/permissions/get-role-permissions.logic';

@Injectable()
@RequestHandler(GetRolePermissionsQuery)
export class GetRolePermissionsHandler implements IRequestHandler<GetRolePermissionsQuery, ApiResult<RolePermissionResponseDto[]>> {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository
  ) {}

  async handle(query: GetRolePermissionsQuery): Promise<ApiResult<RolePermissionResponseDto[]>> {
      return await getRolePermissionsLogic(this.rolePermissionRepository);
  }
}
