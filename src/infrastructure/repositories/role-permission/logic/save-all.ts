import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { RolePermission } from '@/domain/entities/role-permission.entity';
import { saveRolePermissionLogic } from './save';

export const saveAllRolePermissionsLogic = async (prisma: PrismaService, permissions: RolePermission[]): Promise<void> => {
  for (const permission of permissions) {
    await saveRolePermissionLogic(prisma, permission);
  }
};
