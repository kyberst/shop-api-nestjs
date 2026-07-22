import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoProduct } from '@/infrastructure/persistence/mongo/product.model';
import { KafkaConsumerService } from '@/infrastructure/services/messaging/kafka/kafka.consumer.service';

@Injectable()
export class ProductUpdatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(ProductUpdatedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'product-updated-group',
      topics: ['product-updated'],
      handle: async (topic, value) => {
        this.logger.log(`[Product Updated Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        const prodId = value.id || value.productId;
        await MongoProduct.updateOne({ id: prodId }, value);
      },
    });
  }
}
