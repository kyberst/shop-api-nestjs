import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

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

  throw new DatabaseException(
    `Prisma error updating category: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
