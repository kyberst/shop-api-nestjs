import { Module } from '@nestjs/common';
import { KafkaService } from '../services/messaging/kafka/kafka.service';
import { KafkaConsumerService } from '../services/messaging/kafka/kafka.consumer.service';
import { MongooseService } from '../persistence/mongoose.service';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';

@Module({
  providers: [
    KafkaService,
    KafkaConsumerService,
    MongooseService,
    {
      provide: MessageBroker,
      useExisting: KafkaService,
    },
  ],
  exports: [KafkaService, KafkaConsumerService, MessageBroker],
})
export class KafkaModule {}
