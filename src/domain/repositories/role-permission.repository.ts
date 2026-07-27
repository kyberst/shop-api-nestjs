import { RolePermission } from '@/domain/entities/role-permission.entity';

export abstract class RolePermissionRepository {
  abstract save(permission: RolePermission): Promise<void>;
  abstract saveAll(permissions: RolePermission[]): Promise<void>;
  abstract findByRoleAndMenu(role: string, menuKey: string): Promise<RolePermission | null>;
  abstract findByRole(role: string): Promise<RolePermission[]>;
}

