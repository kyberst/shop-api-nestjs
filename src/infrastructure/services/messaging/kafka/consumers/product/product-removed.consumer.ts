import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoProduct } from '@/infrastructure/persistence/mongo/product.model';
import { KafkaConsumerService } from '../../kafka.consumer.service';

@Injectable()
export class ProductRemovedConsumer implements OnModuleInit {
  private readonly logger = new Logger(ProductRemovedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'product-removed-group',
      topics: ['product-removed'],
      handle: async (topic, value) => {
        this.logger.log(`[Product Removed Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        const prodId = value.id || value.productId;
        await MongoProduct.updateOne({ id: prodId }, { isActive: false });
      },
    });
  }
}
