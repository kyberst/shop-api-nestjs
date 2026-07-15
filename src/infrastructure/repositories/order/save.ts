import { Order } from '@/domain/entities/order.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';

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

  throw new AppException(
    OrderResultCode.ORDER_CREATION_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
