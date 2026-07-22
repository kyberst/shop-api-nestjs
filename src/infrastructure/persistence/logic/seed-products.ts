import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongoProduct } from '@/infrastructure/persistence/mongo/product.model';
import { seedProducts } from '@/infrastructure/persistence/seeds/products.seed';
import { seedCategories } from '@/infrastructure/persistence/seeds/categories.seed';
import { SeedTracker } from './seed-tracker';
import { LoggerService } from '@/domain/services/logger.service';

const getCategoryId = (categoryName: string): string => {
  const cat = seedCategories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
  return cat ? cat.id : 'f2f75ef3-7032-4ca3-be30-5899478f6575';
};

export const performProductSeeding = async (
  prisma: PrismaService,
  mongooseConnected: boolean,
  logger: LoggerService,
) => {
  const hash = SeedTracker.getHash(seedProducts);
  const shouldSeed = await SeedTracker.shouldSeed(prisma, 'products', hash);

  if (!shouldSeed) {
    logger.log('Products seed has not changed. Skipping Product seeding.', 'ProductSeed');
    return;
  }

  logger.log('Seeding/Updating products (changes detected)...', 'ProductSeed');

  if (mongooseConnected) {
    for (const p of seedProducts) {
      await MongoProduct.findOneAndUpdate(
        { id: p.id },
        {
          ...p,
          categoryId: getCategoryId(p.category)
        },
        { upsert: true, new: true }
      );
    }
  }

  for (const p of seedProducts) {
    const data = {
      name: p.name,
      description: p.description,
      price: p.price,
      categoryId: getCategoryId(p.category),
      imageUrl: p.imageUrl || '',
      rating: p.rating || 5,
      moq: p.moq || 1,
      supplierName: p.supplierName || 'Direct Supplier',
      supplierCountry: p.supplierCountry || 'China',
      isTradeAssurance: p.isTradeAssurance ?? true,
      isVerified: p.isVerified ?? true,
      isActive: p.isActive ?? true,
    };

    await prisma.product.upsert({
      where: { id: p.id },
      create: { id: p.id, ...data },
      update: data,
    });
  }

  await SeedTracker.updateHistory(prisma, 'products', hash);
  logger.log('Products seeded and hash updated.', 'ProductSeed');
};
