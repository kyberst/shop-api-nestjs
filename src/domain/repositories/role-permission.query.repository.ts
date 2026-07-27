import { RolePermission } from '@/domain/entities/role-permission.entity';

export abstract class RolePermissionQueryRepository {
  abstract findAll(): Promise<RolePermission[]>;
  abstract findByRole(role: string): Promise<RolePermission[]>;
  abstract findByRoleAndMenu(role: string, menuKey: string): Promise<RolePermission | null>;
}
