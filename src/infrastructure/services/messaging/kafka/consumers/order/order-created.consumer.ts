import { Injectable, OnModuleInit, Logger, Inject } from '@nestjs/common';
import { MongoOrder } from '@/infrastructure/persistence/mongo/order.model';
import { KafkaConsumerService } from '@/infrastructure/services/messaging/kafka/kafka.consumer.service';
import { INotificationService } from '@/domain/services/notification.service';

@Injectable()
export class OrderCreatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(OrderCreatedConsumer.name);

  constructor(
    private readonly consumerService: KafkaConsumerService,
    @Inject('INotificationService') private readonly notificationService: INotificationService,
  ) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'order-created-group',
      topics: ['order-created'],
      handle: async (topic, value) => {
        this.logger.log(`[Order Created Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        const orderData = {
          id: value.id,
          userId: value.userId,
          customer: value.customer,
          customerEmail: value.customerEmail,
          date: value.date,
          total: value.total || value.amount,
          status: value.status,
          items: value.items,
        };
        
        await MongoOrder.create(orderData);

        // Broadcast to all (for admins/sellers)
        this.notificationService.broadcast('order:created', orderData);

        // Send specifically to the user (if we have their ID)
        if (value.userId) {
          this.notificationService.sendToUser(value.userId, 'order:created', orderData);
        }
      },
    });
  }
}
