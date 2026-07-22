import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { MongoOrder } from '@/infrastructure/persistence/mongo/order.model';
import { KafkaConsumerService } from '@/infrastructure/services/messaging/kafka/kafka.consumer.service';
import { INotificationService } from '@/domain/services/notification.service';

@Injectable()
export class OrderStatusUpdatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(OrderStatusUpdatedConsumer.name);

  constructor(
    private readonly consumerService: KafkaConsumerService,
    @Inject('INotificationService') private readonly notificationService: INotificationService,
  ) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'order-status-updated-group',
      topics: ['order-status-updated'],
      handle: async (topic, value) => {
        this.logger.log(`[Order Status Updated Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        const ordId = value.id || value.orderId;
        await MongoOrder.updateOne({ id: ordId }, { status: value.status });

        // Fetch updated order to have full info for notification
        const updatedOrder = await MongoOrder.findOne({ id: ordId });
        if (updatedOrder) {
          // Broadcast to all (for admins/sellers)
          this.notificationService.broadcast('order:updated', updatedOrder);

          // Send specifically to the user
          if (updatedOrder.userId) {
            this.notificationService.sendToUser(updatedOrder.userId, 'order:updated', updatedOrder);
          }
        }
      },
    });
  }
}
