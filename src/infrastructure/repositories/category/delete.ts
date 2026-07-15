import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { CategoryResultCode } from '@/application/constants/result-codes/category-result-codes';

/**
 * Fragmented logic to soft delete a category.
 */
export const deleteCategoryLogic = async (
  prisma: PrismaService,
  id: string
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.category.update({ where: { id }, data: { isActive: false } })
  );

  if (prismaResult.ok) {
    const affectedCount = 1;
    return { affectedCount };
  }

  throw new AppException(
    CategoryResultCode.CATEGORY_DELETION_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
