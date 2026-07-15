import { PrismaService } from '../prisma.service';
import { MongoProduct } from '../mongo/product.model';
import { seedProducts } from '../seeds/products.seed';
import { seedCategories } from '../seeds/categories.seed';

const getCategoryId = (categoryName: string): string => {
  const cat = seedCategories.find(c => c.name.toLowerCase() === categoryName.toLowerCase());
  return cat ? cat.id : 'General';
};

export const performProductSeeding = async (prisma: PrismaService, mongooseConnected: boolean) => {
  if (mongooseConnected) {
    console.log('Clearing and seeding MongoDB products...');
    await MongoProduct.deleteMany({});
    const mongoProducts = seedProducts.map(p => ({
      ...p,
      categoryId: getCategoryId(p.category)
    }));
    await MongoProduct.insertMany(mongoProducts);
  }

  console.log('Clearing and seeding MySQL products...');
  await prisma.product.deleteMany({});
  
  for (const p of seedProducts) {
    await prisma.product.create({
      data: {
        id: p.id,
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
        isActive: true,
      },
    });
  }
};
