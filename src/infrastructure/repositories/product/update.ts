import { Product } from '@/domain/entities/product.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

/**
 * Fragmented logic to update a product.
 */
export const updateProductLogic = async (
  prisma: PrismaService,
  id: string,
  updatedFields: Partial<Product>
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.product.update({
      where: { id },
      data: {
        name: updatedFields.name,
        description: updatedFields.description,
        price: updatedFields.price,
        imageUrl: updatedFields.imageUrl,
      },
    })
  );

  if (prismaResult.ok) {
    const affectedCount = 1;
    return { affectedCount };
  }

  throw new AppException(
    ProductResultCode.PRODUCT_UPDATE_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
