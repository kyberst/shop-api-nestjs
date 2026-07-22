import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongoOrder } from '@/infrastructure/persistence/mongo/order.model';
import { seedOrders } from '@/infrastructure/persistence/seeds/orders.seed';
import { SeedTracker } from './seed-tracker';
import { LoggerService } from '@/domain/services/logger.service';

export const performOrderSeeding = async (
  prisma: PrismaService,
  mongooseConnected: boolean,
  logger: LoggerService,
) => {
  const hash = SeedTracker.getHash(seedOrders);
  const shouldSeed = await SeedTracker.shouldSeed(prisma, 'orders', hash);

  if (!shouldSeed) {
    logger.log('Orders seed has not changed. Skipping Order seeding.', 'OrderSeed');
    return;
  }

  logger.log('Seeding/Updating orders (changes detected)...', 'OrderSeed');

  if (mongooseConnected) {
    for (const order of seedOrders) {
      await MongoOrder.findOneAndUpdate(
        { id: order.id },
        order,
        { upsert: true, new: true }
      );
    }
  }

  for (const order of seedOrders) {
    const data = {
      product: order.items[0]?.name || 'Direct Order',
      customer: order.customer,
      date: order.date || new Date().toISOString(),
      amount: order.total,
      status: order.status || 'Pending',
      avatar: order.items[0]?.imageUrl || '',
    };

    await prisma.order.upsert({
      where: { id: order.id },
      create: { id: order.id, ...data },
      update: data,
    });
  }

  await SeedTracker.updateHistory(prisma, 'orders', hash);
  logger.log('Orders seeded and hash updated.', 'OrderSeed');
};
