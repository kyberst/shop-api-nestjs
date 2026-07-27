import { Order } from '@/domain/entities/order.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to update an order status.
 */
export const updateOrderStatusLogic = async (
  prisma: PrismaService,
  id: string,
  status: Order['status']
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.order.update({ where: { id }, data: { status } })
  );

  if (prismaResult.ok) {
    const affectedCount = 1;
    return { affectedCount };
  }

  throw new DatabaseException(
    `Prisma error updating order status: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
