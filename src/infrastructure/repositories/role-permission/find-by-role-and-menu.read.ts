import { RolePermission } from '@/domain/entities/role-permission.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';

export const findRolePermissionByRoleAndMenuLogic = async (
  mongoose: MongooseService,
  role: string,
  menuKey: string
): Promise<RolePermission | null> => {
  const RolePermissionModel = mongoose.getModel('RolePermission');

  const mongoResult = await dbGuard(mongoose, () =>
    RolePermissionModel.findOne({ role, menuKey }, { id: 1, role: 1, menuKey: 1, canView: 1, canEdit: 1, canDelete: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok && mongoResult.value) {
    return RolePermission.create(mongoResult.value as any);
  }
  return null;
};
