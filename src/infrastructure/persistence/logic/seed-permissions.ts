import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import { MongoRolePermission } from '../mongo/role-permission.model';

export const performPermissionSeeding = async (prisma: PrismaClient, mongooseConnected: boolean) => {
  const count = await prisma.rolePermission.count();
  if (count > 0) {
    if (mongooseConnected) {
      const mCount = await MongoRolePermission.countDocuments();
      if (mCount === 0) {
        console.log('Syncing MongoDB role permissions from MySQL...');
        const perms = await prisma.rolePermission.findMany();
        await MongoRolePermission.insertMany(perms);
      }
    }
    return;
  }

  console.log('Seeding default role permissions...');

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
        id: uuidv4(),
        role,
        menuKey: menu,
        canView,
        canEdit,
        canDelete,
      });
    }
  }

  await prisma.rolePermission.createMany({
    data: permissions,
  });

  if (mongooseConnected) {
    console.log('Clearing and seeding MongoDB role permissions...');
    await MongoRolePermission.deleteMany({});
    await MongoRolePermission.insertMany(permissions);
  }
};
