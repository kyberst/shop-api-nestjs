import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { ApiResult } from '@/shared/types/api-result';
import { PermissionResultCode } from '@/application/constants/result-codes/permission-result-codes';
import { RolePermissionResponseDto } from '@/application/dtos/response/permissions/role-permission.response.dto';
import { PermissionMapper } from '@/application/mappers/permission.mapper';

export const getRolePermissionsLogic = async (
  rolePermissionRepository: RolePermissionRepository,
): Promise<ApiResult<RolePermissionResponseDto[]>> => {
  try {
    const permissions = await rolePermissionRepository.findAll();
    const dtos = PermissionMapper.toResponseList(permissions);
    return ApiResult.FromInfo(PermissionResultCode.PERMISSIONS_FOUND, dtos);
  } catch (error) {
    return ApiResult.FromInfo<RolePermissionResponseDto[]>(PermissionResultCode.PERMISSIONS_FETCH_FAILED, null as any, undefined, error);
  }
};
