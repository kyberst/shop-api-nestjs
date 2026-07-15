import { PrismaService } from '../prisma.service';
import { MongoOrder } from '../mongo/order.model';
import { seedOrders } from '../seeds/orders.seed';

export const performOrderSeeding = async (prisma: PrismaService, mongooseConnected: boolean) => {
  if (mongooseConnected) {
    console.log('Clearing and seeding MongoDB orders...');
    await MongoOrder.deleteMany({});
    await MongoOrder.insertMany(seedOrders);
  }

  console.log('Clearing and seeding MySQL orders...');
  await prisma.order.deleteMany({});
  
  for (const order of seedOrders) {
    await prisma.order.create({
      data: {
        id: order.id,
        product: order.items[0]?.name || 'Direct Order',
        customer: order.customer,
        date: order.date || new Date().toISOString(),
        amount: order.total,
        status: order.status || 'Pending',
        avatar: order.items[0]?.imageUrl || '',
      },
    });
  }
};
