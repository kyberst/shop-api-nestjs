import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { ApiResult } from '@/shared/types/api-result';
import { PermissionResultCode } from '@/application/constants/result-codes/permission-result-codes';
import { UpdateRolePermissionsRequestDto } from '@/application/dtos/request/permissions/update-role-permissions.request.dto';
import { RolePermission } from '@/domain/entities/role-permission.entity';
import { v4 as uuidv4 } from 'uuid';

export const updateRolePermissionsLogic = async (
  rolePermissionRepository: RolePermissionRepository,
  dto: UpdateRolePermissionsRequestDto,
): Promise<ApiResult<void>> => {
  try {
    const { role, permissions } = dto;
    for (const p of permissions) {
      const existing = await rolePermissionRepository.findByRoleAndMenu(role, p.menuKey);
      if (existing) {
        existing.updatePermissions(p.canView, p.canEdit, p.canDelete);
        await rolePermissionRepository.save(existing);
      } else {
        const newPerm = RolePermission.create({
          id: uuidv4(),
          role,
          menuKey: p.menuKey,
          canView: p.canView,
          canEdit: p.canEdit,
          canDelete: p.canDelete,
        });
        await rolePermissionRepository.save(newPerm);
      }
    }
    return ApiResult.FromInfo(PermissionResultCode.PERMISSIONS_UPDATED, undefined);
  } catch (error) {
    return ApiResult.FromInfo(PermissionResultCode.PERMISSION_UPDATE_FAILED, null, undefined, error);
  }
};
