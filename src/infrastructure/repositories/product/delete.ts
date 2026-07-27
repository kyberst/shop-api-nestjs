import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to soft delete a product.
 */
export const deleteProductLogic = async (
  prisma: PrismaService,
  id: string
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.product.update({ where: { id }, data: { isActive: false } })
  );

  if (prismaResult.ok) {
    const affectedCount = 1;
    return { affectedCount };
  }

  throw new DatabaseException(
    `Prisma error deleting product: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
