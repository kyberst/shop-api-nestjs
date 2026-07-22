import { RolePermission } from '@/domain/entities/role-permission.entity';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';

export class PermissionMapper {
  static toResponse(p: RolePermission): RolePermissionResponseDto {
    return {
      id: p.id,
      role: p.role,
      menuKey: p.menuKey,
      canView: p.canView,
      canEdit: p.canEdit,
      canDelete: p.canDelete,
    };
  }

  static toResponseList(permissions: RolePermission[]): RolePermissionResponseDto[] {
    return permissions.map(p => this.toResponse(p));
  }
}
