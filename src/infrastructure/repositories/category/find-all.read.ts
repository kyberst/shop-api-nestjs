import { Category } from '@/domain/entities/category.entity';
import { MongooseService } from '../../persistence/mongoose.service';
import { MongoCategory } from '../../persistence/mongo/category.model';
import { dbGuard } from '../../persistence/db-guard';
import { AppException } from '@/shared/errors/app-exception';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';

/**
 * Fragmented logic to find all active categories.
 */
export const findAllCategoriesLogic = async (
  mongoose: MongooseService
): Promise<Category[]> => {
  const mongoResult = await dbGuard(mongoose, () =>
    MongoCategory.find({ isActive: true }, { id: 1, name: 1, isActive: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok) {
    return (mongoResult.value || []) as Category[];
  }

  throw new AppException(
    CategoryResultCode.CATEGORIES_FETCH_FAILED,
    `Mongo error: ${mongoResult.error?.message}`
  );
};
