import { PrismaService } from '../prisma.service';
import { MongoCategory } from '../mongo/category.model';
import { seedCategories } from '../seeds/categories.seed';

export const performCategorySeeding = async (prisma: PrismaService, mongooseConnected: boolean) => {
  if (mongooseConnected) {
    console.log('Clearing and seeding MongoDB categories...');
    await MongoCategory.deleteMany({});
    await MongoCategory.insertMany(seedCategories);
  }

  console.log('Clearing MySQL categories and cascading products...');
  await prisma.product.deleteMany({});
  await prisma.category.deleteMany({});

  console.log('Seeding MySQL categories...');
  for (const cat of seedCategories) {
    await prisma.category.create({
      data: { id: cat.id, name: cat.name, isActive: cat.isActive },
    });
  }
};
