import { Kafka } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';
import { IModuleConsumer } from './register-consumer.logic';
import { handleMessageLogic } from './handle-message.logic';

export const startConsumerLogic = (
  kafka: Kafka,
  c: IModuleConsumer,
  logger: LoggerService
): void => {
  const consumer = kafka.consumer({ groupId: c.groupId });
  
  (async () => {
    try {
      await consumer.connect();

      for (const topic of c.topics) {
        await consumer.subscribe({ topic, fromBeginning: true });
      }

      await consumer.run({
        eachMessage: async ({ topic, message }) => {
          await handleMessageLogic(c, topic, message, logger);
        },
      });

      logger.log(`Kafka Consumer subscribed successfully for group: ${c.groupId}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      
    }
  })();
};
