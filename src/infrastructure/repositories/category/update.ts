import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';

/**
 * Fragmented logic to update a category.
 */
export const updateCategoryLogic = async (
  prisma: PrismaService,
  id: string,
  updatedFields: Partial<Category>
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.category.update({ where: { id }, data: { name: updatedFields.name } })
  );

  if (prismaResult.ok) {
    const affectedCount = 1;
    return { affectedCount };
  }

  throw new AppException(
    CategoryResultCode.CATEGORY_UPDATE_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
