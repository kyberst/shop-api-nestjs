import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../persistence/prisma.service';
import { MongooseService } from '../../persistence/mongoose.service';
import { RolePermissionRepository as DomainRolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { RolePermission } from '@/domain/entities/role-permission.entity';
import { findAllRolePermissionsLogic } from './logic/find-all.read';
import { findRolePermissionsByRoleLogic } from './logic/find-by-role.read';
import { findRolePermissionByRoleAndMenuLogic } from './logic/find-by-role-and-menu.read';
import { saveRolePermissionLogic } from './logic/save';
import { saveAllRolePermissionsLogic } from './logic/save-all';

@Injectable()
export class RolePermissionRepository extends DomainRolePermissionRepository {
  constructor(
    private readonly prisma: PrismaService,
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

  async save(permission: RolePermission): Promise<void> {
    return saveRolePermissionLogic(this.prisma, permission);
  }

  async saveAll(permissions: RolePermission[]): Promise<void> {
    return saveAllRolePermissionsLogic(this.prisma, permissions);
  }
}

