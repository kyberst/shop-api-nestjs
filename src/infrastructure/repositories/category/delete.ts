import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

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

  throw new DatabaseException(
    `Prisma error deleting category: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
