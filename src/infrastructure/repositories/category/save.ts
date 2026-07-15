import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';

/**
 * Fragmented logic to save a category.
 */
export const saveCategoryLogic = async (
  prisma: PrismaService,
  category: Category
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.category.create({ data: { id: category.id, name: category.name, isActive: true } })
  );

  if (prismaResult.ok) {
    return { affectedCount: 1 };
  }

  throw new AppException(
    CategoryResultCode.CATEGORY_CREATION_FAILED, 
    `Prisma error: ${prismaResult.error?.message}`
  );
};
