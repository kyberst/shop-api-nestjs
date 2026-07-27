import { Product } from '@/domain/entities/product.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

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
        categoryId: 'f2f75ef3-7032-4ca3-be30-5899478f6575',
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

  throw new DatabaseException(
    `Prisma error saving product: ${prismaResult.error?.message}`,
    prismaResult.error
  );
};
