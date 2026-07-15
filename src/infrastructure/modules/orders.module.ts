import { Module } from '@nestjs/common';
import { FindAllOrdersController } from '../../api/controllers/orders/find-all-orders.controller';
import { CreateOrderController } from '../../api/controllers/orders/create-order.controller';
import { UpdateOrderStatusController } from '../../api/controllers/orders/update-order-status.controller';
import { CreateOrderHandler } from '../../application/use-cases/handlers/orders/create-order.handler';
import { UpdateOrderStatusHandler } from '../../application/use-cases/handlers/orders/update-order-status.handler';
import { FindAllOrdersHandler } from '../../application/use-cases/handlers/orders/find-all-orders.handler';
import { KafkaModule } from './kafka.module';
import { OrderCreatedConsumer } from '../services/messaging/kafka/consumers/order/order-created.consumer';
import { OrderStatusUpdatedConsumer } from '../services/messaging/kafka/consumers/order/order-status-updated.consumer';
import { NotificationsModule } from './notifications.module';

@Module({
  imports: [KafkaModule, NotificationsModule],
  controllers: [
    FindAllOrdersController,
    CreateOrderController,
    UpdateOrderStatusController,
  ],
  providers: [
    CreateOrderHandler,
    UpdateOrderStatusHandler,
    FindAllOrdersHandler,
    OrderCreatedConsumer,
    OrderStatusUpdatedConsumer,
  ],
})
export class OrdersModule {}
