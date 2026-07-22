import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoProduct } from '@/infrastructure/persistence/mongo/product.model';
import { KafkaConsumerService } from '@/infrastructure/services/messaging/kafka/kafka.consumer.service';

@Injectable()
export class ProductCreatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(ProductCreatedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'product-created-group',
      topics: ['product-created'],
      handle: async (topic, value) => {
        this.logger.log(`[Product Created Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        await MongoProduct.create({
          id: value.id,
          name: value.name,
          description: value.description,
          price: value.price,
          categoryId: value.categoryId && value.categoryId !== 'General' ? value.categoryId : 'f2f75ef3-7032-4ca3-be30-5899478f6575',
          imageUrl: value.imageUrl,
          rating: value.rating,
          moq: value.moq,
          supplierName: value.supplierName,
          supplierCountry: value.supplierCountry,
          isTradeAssurance: value.isTradeAssurance,
          isVerified: value.isVerified,
          isActive: value.isActive !== false,
        });
      },
    });
  }
}
