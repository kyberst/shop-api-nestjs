import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { MongoRolePermission } from '@/infrastructure/persistence/mongo/role-permission.model';
import { SeedTracker } from './seed-tracker';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { LoggerService } from '@/domain/services/logger.service';

export const performPermissionSeeding = async (
  prisma: PrismaService,
  mongooseConnected: boolean,
  logger: LoggerService,
) => {
  const menus = ['dashboard', 'products', 'categories', 'orders', 'users', 'ai-assistant'];
  const roles = ['admin', 'sales', 'user'];

  const permissions = [];

  for (const role of roles) {
    for (const menu of menus) {
      let canView = false;
      let canEdit = false;
      let canDelete = false;

      if (role === 'admin') {
        canView = true;
        canEdit = true;
        canDelete = true;
      } else if (role === 'sales') {
        // Sales can view and edit products/categories/orders
        if (['products', 'categories', 'orders', 'dashboard'].includes(menu)) {
          canView = true;
          canEdit = true;
        }
      } else if (role === 'user') {
        // Normal user can only view orders and dashboard
        if (['orders', 'dashboard'].includes(menu)) {
          canView = true;
        }
      }

      permissions.push({
        role,
        menuKey: menu,
        canView,
        canEdit,
        canDelete,
      });
    }
  }

  // Generate hash over the structured permission configuration
  const hash = SeedTracker.getHash(permissions);
  const shouldSeed = await SeedTracker.shouldSeed(prisma, 'permissions', hash);

  if (!shouldSeed) {
    logger.log('Role permissions configuration has not changed. Skipping Permission seeding.', 'PermissionSeed');
    return;
  }

  logger.log('Seeding/Updating role permissions (changes detected)...', 'PermissionSeed');

  if (mongooseConnected) {
    for (const perm of permissions) {
      await MongoRolePermission.findOneAndUpdate(
        { role: perm.role, menuKey: perm.menuKey },
        perm,
        { upsert: true, new: true }
      );
    }
  }

  for (const perm of permissions) {
    // We query by unique role + menuKey compound index or unique key
    const existing = await prisma.rolePermission.findUnique({
      where: {
        role_menuKey: {
          role: perm.role,
          menuKey: perm.menuKey,
        },
      },
    });

    if (existing) {
      await prisma.rolePermission.update({
        where: { id: existing.id },
        data: {
          canView: perm.canView,
          canEdit: perm.canEdit,
          canDelete: perm.canDelete,
        },
      });
    } else {
      await prisma.rolePermission.create({
        data: {
          id: uuidv4(),
          role: perm.role,
          menuKey: perm.menuKey,
          canView: perm.canView,
          canEdit: perm.canEdit,
          canDelete: perm.canDelete,
        },
      });
    }
  }

  await SeedTracker.updateHistory(prisma, 'permissions', hash);
  logger.log('Role permissions seeded and hash updated.', 'PermissionSeed');
};
