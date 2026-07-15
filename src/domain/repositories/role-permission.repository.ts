import { RolePermission } from '@/domain/entities/role-permission.entity';

export abstract class RolePermissionRepository {
  abstract findAll(): Promise<RolePermission[]>;
  abstract findByRole(role: string): Promise<RolePermission[]>;
  abstract findByRoleAndMenu(role: string, menuKey: string): Promise<RolePermission | null>;
  abstract save(permission: RolePermission): Promise<void>;
  abstract saveAll(permissions: RolePermission[]): Promise<void>;
}
