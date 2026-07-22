import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoCategory } from '@/infrastructure/persistence/mongo/category.model';
import { KafkaConsumerService } from '@/infrastructure/services/messaging/kafka/kafka.consumer.service';

@Injectable()
export class CategoryRemovedConsumer implements OnModuleInit {
  private readonly logger = new Logger(CategoryRemovedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'category-removed-group',
      topics: ['category-removed'],
      handle: async (topic, value) => {
        this.logger.log(`[Category Removed Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        const catId = value.id || value.categoryId;
        await MongoCategory.updateOne({ id: catId }, { isActive: false });
      },
    });
  }
}
