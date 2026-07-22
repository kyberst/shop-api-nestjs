import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { Product } from '@/domain/entities/product.entity';

/**
 * Isolated logic to find a single product by ID from the Prisma database.
 * Matches Clean Architecture and Atomic Decoupling principles.
 * 
 * @param prisma - The Prisma persistence service.
 * @param id - The ID of the product.
 * @returns A promise that resolves to the domain Product entity or null if not found.
 */
export const findProductByIdLogic = async (
  prisma: PrismaService,
  id: string,
): Promise<Product | null> => {
  const p = await prisma.product.findUnique({ where: { id } });
  if (!p) return null;
  return Product.create({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    category: 'General',
    imageUrl: p.imageUrl,
    rating: p.rating,
    moq: p.moq,
    supplierName: p.supplierName,
    supplierCountry: p.supplierCountry,
    isTradeAssurance: p.isTradeAssurance,
    isVerified: p.isVerified,
    isActive: p.isActive,
  });
};
