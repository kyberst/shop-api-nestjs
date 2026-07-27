import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

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

  throw new DatabaseException(
    `Prisma error creating category: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
