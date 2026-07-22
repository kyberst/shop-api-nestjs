import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { RolePermission } from '@/domain/entities/role-permission.entity';

export const saveRolePermissionLogic = async (prisma: PrismaService, permission: RolePermission): Promise<void> => {
  await prisma.rolePermission.upsert({
    where: {
      role_menuKey: { role: permission.role, menuKey: permission.menuKey },
    },
    update: {
      canView: permission.canView,
      canEdit: permission.canEdit,
      canDelete: permission.canDelete,
    },
    create: {
      id: permission.id,
      role: permission.role,
      menuKey: permission.menuKey,
      canView: permission.canView,
      canEdit: permission.canEdit,
      canDelete: permission.canDelete,
    },
  });
};
