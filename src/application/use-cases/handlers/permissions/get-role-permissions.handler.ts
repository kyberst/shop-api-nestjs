import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RolePermissionQueryRepository } from '@/domain/repositories/role-permission.query.repository';
import { GetRolePermissionsQuery } from '@/application/use-cases/queries/permissions/get-role-permissions.query';
import { ApiResult } from '@/shared/types/api-result';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';
import { getRolePermissionsLogic } from '@/application/use-cases/logic/permissions/get-role-permissions.logic';


@RequestHandler(GetRolePermissionsQuery)
export class GetRolePermissionsHandler implements IRequestHandler<GetRolePermissionsQuery, ApiResult<RolePermissionResponseDto[]>> {
  constructor(
    private readonly rolePermissionRepository: RolePermissionQueryRepository
  ) {}

  async handle(query: GetRolePermissionsQuery): Promise<ApiResult<RolePermissionResponseDto[]>> {
      return await getRolePermissionsLogic(this.rolePermissionRepository);
  }
}
