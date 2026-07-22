import { RolePermission } from '@/domain/entities/role-permission.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { MongoRolePermission } from '@/infrastructure/persistence/mongo/role-permission.model';
import { dbGuard } from '@/infrastructure/persistence/db-guard';

export const findRolePermissionByRoleAndMenuLogic = async (
  mongoose: MongooseService,
  role: string,
  menuKey: string
): Promise<RolePermission | null> => {
  const mongoResult = await dbGuard(mongoose, () =>
    MongoRolePermission.findOne({ role, menuKey }, { id: 1, role: 1, menuKey: 1, canView: 1, canEdit: 1, canDelete: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok && mongoResult.value) {
    return RolePermission.create(mongoResult.value as any);
  }
  return null;
};
