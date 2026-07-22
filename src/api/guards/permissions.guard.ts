import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY, RequiredPermission } from '@/api/decorators/permissions.decorator';
import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionRepository: RolePermissionRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermission = this.reflector.getAllAndOverride<RequiredPermission>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredPermission) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException('User has no assigned role');
    }

    // Admin bypass
    if (user.role === 'admin') {
      return true;
    }

    const permission = await this.permissionRepository.findByRoleAndMenu(user.role, requiredPermission.menuKey);

    if (!permission) {
      throw new ForbiddenException(`User role '${user.role}' has no permissions for menu '${requiredPermission.menuKey}'`);
    }

    let hasAccess = false;
    switch (requiredPermission.action) {
      case 'view':
        hasAccess = permission.canView;
        break;
      case 'edit':
        hasAccess = permission.canEdit;
        break;
      case 'delete':
        hasAccess = permission.canDelete;
        break;
    }

    if (!hasAccess) {
      throw new ForbiddenException(`User role '${user.role}' does not have '${requiredPermission.action}' permission for menu '${requiredPermission.menuKey}'`);
    }

    return true;
  }
}
