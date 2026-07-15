import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

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

  throw new AppException(
    ProductResultCode.PRODUCT_DELETION_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
