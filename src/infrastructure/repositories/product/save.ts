import { Product } from '@/domain/entities/product.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { ProductResultCode } from '@/application/constants/result-codes/product-result-codes';

/**
 * Fragmented logic to save a product.
 */
export const saveProductLogic = async (
  prisma: PrismaService,
  product: Product
): Promise<MutationSummary> => {
  const prismaResult = await dbGuard(prisma, () => 
    prisma.product.create({
      data: {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        categoryId: 'General',
        imageUrl: product.imageUrl || '',
        rating: product.rating || 5,
        moq: product.moq || 1,
        supplierName: product.supplierName || 'Direct Supplier',
        supplierCountry: product.supplierCountry || 'China',
        isTradeAssurance: product.isTradeAssurance ?? true,
        isVerified: product.isVerified ?? true,
        isActive: true,
      },
    })
  );

  if (prismaResult.ok) {
    return { affectedCount: 1 };
  }

  throw new AppException(
    ProductResultCode.PRODUCT_CREATION_FAILED,
    `Prisma error: ${prismaResult.error?.message}`
  );
};
