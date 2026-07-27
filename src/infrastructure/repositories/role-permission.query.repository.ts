import { Injectable } from '@nestjs/common';
import { RolePermissionQueryRepository as DomainRolePermissionQueryRepository } from '@/domain/repositories/role-permission.query.repository';
import { RolePermission } from '@/domain/entities/role-permission.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { findAllRolePermissionsLogic } from './role-permission/find-all.read';
import { findRolePermissionsByRoleLogic } from './role-permission/find-by-role.read';
import { findRolePermissionByRoleAndMenuLogic } from './role-permission/find-by-role-and-menu.read';

@Injectable()
export class RolePermissionQueryRepository extends DomainRolePermissionQueryRepository {
  constructor(
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(): Promise<RolePermission[]> {
    return findAllRolePermissionsLogic(this.mongoose);
  }

  async findByRole(role: string): Promise<RolePermission[]> {
    return findRolePermissionsByRoleLogic(this.mongoose, role);
  }

  async findByRoleAndMenu(role: string, menuKey: string): Promise<RolePermission | null> {
    return findRolePermissionByRoleAndMenuLogic(this.mongoose, role, menuKey);
  }
}
