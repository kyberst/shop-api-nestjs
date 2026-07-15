import { Order } from '@/domain/entities/order.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';

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

  throw new AppException(
    OrderResultCode.ORDER_STATUS_UPDATE_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
