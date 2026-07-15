import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';

export class GetRolePermissionsQuery extends IRequest<ApiResult<RolePermissionResponseDto[]>> {
  constructor() {
    super();}
}
