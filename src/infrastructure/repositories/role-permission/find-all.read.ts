import { RolePermission } from '@/domain/entities/role-permission.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { MongoRolePermission } from '@/infrastructure/persistence/mongo/role-permission.model';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { AppException } from '@/shared/errors/app-exception';
import { PermissionResultCode } from '@/application/constants/result-codes/permission-result-codes';

export const findAllRolePermissionsLogic = async (
  mongoose: MongooseService
): Promise<RolePermission[]> => {
  const mongoResult = await dbGuard(mongoose, () =>
    MongoRolePermission.find({}, { id: 1, role: 1, menuKey: 1, canView: 1, canEdit: 1, canDelete: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok) {
    return (mongoResult.value || []).map((p: any) => RolePermission.create(p));
  }

  throw new AppException(
    PermissionResultCode.PERMISSIONS_FETCH_FAILED,
    `Mongo error: ${mongoResult.error?.message}`
  );
};
