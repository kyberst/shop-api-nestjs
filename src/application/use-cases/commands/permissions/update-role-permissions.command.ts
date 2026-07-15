import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { UpdateRolePermissionsRequestDto } from '@/application/dtos/request/permissions/update-role-permissions.request.dto';

export class UpdateRolePermissionsCommand extends IRequest<ApiResult<void>> {
  constructor(public readonly dto: UpdateRolePermissionsRequestDto) {
    super();}
}
