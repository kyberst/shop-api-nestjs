import { Product } from '@/domain/entities/product.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';

/**
 * Logic to find a product by name using Prisma (source of truth for internal validation).
 */
export const findProductByNameLogic = async (
  prisma: PrismaService,
  name: string
): Promise<Product | null> => {
  const prismaResult = await dbGuard(prisma, async () => {
    const product = await prisma.product.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });
    return product as Product | null;
  });

  if (prismaResult.ok) {
    return prismaResult.value;
  }
  
  return null;
};
