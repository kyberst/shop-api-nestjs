import { Module } from '@nestjs/common';
import { FindAllOrdersController } from '@/api/controllers/orders/find-all-orders.controller';
import { CreateOrderController } from '@/api/controllers/orders/create-order.controller';
import { CreateAdminOrderController } from '@/api/controllers/orders/create-admin-order.controller';
import { UpdateOrderStatusController } from '@/api/controllers/orders/update-order-status.controller';
import { CreateOrderHandler } from '@/application/use-cases/handlers/orders/create-order.handler';
import { UpdateOrderStatusHandler } from '@/application/use-cases/handlers/orders/update-order-status.handler';
import { FindAllOrdersHandler } from '@/application/use-cases/handlers/orders/find-all-orders.handler';
import { KafkaModule } from './kafka.module';
import { OrderCreatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/order/order-created.consumer';
import { OrderStatusUpdatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/order/order-status-updated.consumer';
import { NotificationsModule } from './notifications.module';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { OrderQueryRepository } from '@/domain/repositories/order.query.repository';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';

@Module({
  imports: [KafkaModule, NotificationsModule],
  controllers: [
    FindAllOrdersController,
    CreateOrderController,
    CreateAdminOrderController,
    UpdateOrderStatusController,
  ],
  providers: [
    {
      provide: CreateOrderHandler,
      useFactory: (repo: OrderRepository, broker: MessageBroker) => {
        return new CreateOrderHandler(repo, broker);
      },
      inject: [OrderRepository, MessageBroker],
    },
    {
      provide: UpdateOrderStatusHandler,
      useFactory: (repo: OrderRepository, broker: MessageBroker) => {
        return new UpdateOrderStatusHandler(repo, broker);
      },
      inject: [OrderRepository, MessageBroker],
    },
    {
      provide: FindAllOrdersHandler,
      useFactory: (repo: OrderQueryRepository) => {
        return new FindAllOrdersHandler(repo);
      },
      inject: [OrderQueryRepository],
    },
    OrderCreatedConsumer,
    OrderStatusUpdatedConsumer,
  ],
})
export class OrdersModule {}
