import { LoggerService } from '@/domain/services/logger.service';
import { KafkaService } from '../kafka.service';

export interface IModuleConsumer {
  groupId: string;
  topics: string[];
  handle: (topic: string, value: any) => Promise<void>;
}

export const registerConsumerLogic = (
  consumer: IModuleConsumer,
  consumers: IModuleConsumer[],
  logger: LoggerService
): void => {
  consumers.push(consumer);

  KafkaService.registerLocalListener(async (topic, message) => {
    if (consumer.topics.includes(topic)) {
      try {
        await consumer.handle(topic, message);
      } catch (err: any) {
        logger.error(`Error in modular local event listener for topic ${topic}: ${err.message}`, err.stack);
      }
    }
  });
};
