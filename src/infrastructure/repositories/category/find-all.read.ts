import { Category } from '@/domain/entities/category.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to find all active categories.
 */
export const findAllCategoriesLogic = async (
  mongoose: MongooseService
): Promise<Category[]> => {
  const CategoryModel = mongoose.getModel('Category');

  const mongoResult = await dbGuard(mongoose, () =>
    CategoryModel.find({ isActive: true }, { id: 1, name: 1, isActive: 1, _id: 0 }).lean()
  );

  if (mongoResult.ok) {
    return (mongoResult.value || []) as unknown as Category[];
  }

  throw new DatabaseException(
    `Mongo error fetching categories: ${mongoResult.error?.message}`,
    mongoResult.error
  );
};
