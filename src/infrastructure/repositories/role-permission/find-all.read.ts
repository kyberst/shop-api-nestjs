import { RolePermission } from '@/domain/entities/role-permission.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

export const findAllRolePermissionsLogic = async (
  mongoose: MongooseService
): Promise<RolePermission[]> => {
  const RolePermissionModel = mongoose.getModel('RolePermission');

  const mongoResult = await dbGuard(mongoose, () =>
    RolePermissionModel.find({}, { id: 1, role: 1, menuKey: 1, canView: 1, canEdit: 1, canDelete: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok) {
    return (mongoResult.value || []).map((p: any) => RolePermission.create(p));
  }

  throw new DatabaseException(
    `Mongo error fetching role permissions: ${mongoResult.error?.message}`,
    mongoResult.error
  );
};
