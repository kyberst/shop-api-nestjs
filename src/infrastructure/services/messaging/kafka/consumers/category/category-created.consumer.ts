import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { MongoCategory } from '@/infrastructure/persistence/mongo/category.model';
import { KafkaConsumerService } from '../../kafka.consumer.service';

@Injectable()
export class CategoryCreatedConsumer implements OnModuleInit {
  private readonly logger = new Logger(CategoryCreatedConsumer.name);

  constructor(private readonly consumerService: KafkaConsumerService) {}

  async onModuleInit() {
    this.consumerService.registerConsumer({
      groupId: 'category-created-group',
      topics: ['category-created'],
      handle: async (topic, value) => {
        this.logger.log(`[Category Created Consumer] Handling topic: ${topic}, value: ${JSON.stringify(value)}`);
        await MongoCategory.create({
          id: value.id,
          name: value.name,
          isActive: value.isActive !== false,
        });
      },
    });
  }
}
