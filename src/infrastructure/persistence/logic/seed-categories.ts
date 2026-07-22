import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongoCategory } from '@/infrastructure/persistence/mongo/category.model';
import { seedCategories } from '@/infrastructure/persistence/seeds/categories.seed';
import { SeedTracker } from './seed-tracker';
import { LoggerService } from '@/domain/services/logger.service';

export const performCategorySeeding = async (
  prisma: PrismaService,
  mongooseConnected: boolean,
  logger: LoggerService,
) => {
  const hash = SeedTracker.getHash(seedCategories);
  const shouldSeed = await SeedTracker.shouldSeed(prisma, 'categories', hash);

  if (!shouldSeed) {
    logger.log('Categories seed has not changed. Skipping Category seeding.', 'CategorySeed');
    return;
  }

  logger.log('Seeding/Updating categories (changes detected)...', 'CategorySeed');

  if (mongooseConnected) {
    for (const cat of seedCategories) {
      await MongoCategory.findOneAndUpdate(
        { id: cat.id },
        { name: cat.name, isActive: cat.isActive },
        { upsert: true, new: true }
      );
    }
  }

  for (const cat of seedCategories) {
    await prisma.category.upsert({
      where: { id: cat.id },
      create: { id: cat.id, name: cat.name, isActive: cat.isActive },
      update: { name: cat.name, isActive: cat.isActive },
    });
  }

  await SeedTracker.updateHistory(prisma, 'categories', hash);
  logger.log('Categories seeded and hash updated.', 'CategorySeed');
};
