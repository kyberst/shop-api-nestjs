import { Order } from '@/domain/entities/order.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to save an order.
 */
export const saveOrderLogic = async (
  prisma: PrismaService,
  order: Order
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.order.create({
      data: {
        id: order.id,
        product: order.items[0]?.name || 'Direct Order',
        customer: order.customer,
        date: order.date ? new Date(order.date).toISOString() : new Date().toISOString(),
        amount: order.total,
        status: order.status || 'Pending',
        avatar: order.items[0]?.imageUrl || '',
      },
    })
  );

  if (prismaResult.ok) {
    return { affectedCount: 1 };
  }

  throw new DatabaseException(
    `Prisma error creating order: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
