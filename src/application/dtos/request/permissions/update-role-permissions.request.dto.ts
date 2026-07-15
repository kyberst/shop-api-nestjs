import { PermissionUpdateItemRequestDto } from './permission-update-item.request.dto';

export class UpdateRolePermissionsRequestDto {
  role!: string;

  permissions!: PermissionUpdateItemRequestDto[];
}
