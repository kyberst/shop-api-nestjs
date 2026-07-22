import { Category } from '@/domain/entities/category.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';

/**
 * Logic to find a category by name using Prisma (source of truth for internal validation).
 */
export const findCategoryByNameLogic = async (
  prisma: PrismaService,
  name: string
): Promise<Category | null> => {
  const prismaResult = await dbGuard(prisma, async () => {
    const category = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });
    return category as Category | null;
  });

  if (prismaResult.ok) {
    return prismaResult.value;
  }
  
  return null;
};
