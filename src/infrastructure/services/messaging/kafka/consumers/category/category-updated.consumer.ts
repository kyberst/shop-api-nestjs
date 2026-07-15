import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoCategory } from '@/infrastructure/persistence/mongo/category.model';
import { KafkaConsumerService } from '../../kafka.consumer.service';

@Injectable()
export class CategoryUpdatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(CategoryUpdatedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'category-updated-group',
      topics: ['category-updated'],
      handle: async (topic, value) => {
        this.logger.log(`[Category Updated Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        await MongoCategory.updateOne({ id: value.id }, { name: value.name });
      },
    });
  }
}
