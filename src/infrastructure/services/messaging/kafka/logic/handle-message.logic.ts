import { LoggerService } from '@/domain/services/logger.service';
import { IModuleConsumer } from './register-consumer.logic';
import { KafkaException } from '@/infrastructure/exceptions/kafka.exception';

export const handleMessageLogic = async (
  c: IModuleConsumer,
  topic: string,
  message: any,
  logger: LoggerService
): Promise<void> => {
  try {
    if (message.value) {
      const value = JSON.parse(message.value.toString());
      logger.log(`[Kafka Consumer: ${c.groupId}] Received event ${topic}: ${JSON.stringify(value)}`);
      await c.handle(topic, value);
    }
  } catch (err: any) {
    logger.error(`Failed to process Kafka consumer message for topic ${topic}: ${err.message}`, err.stack);
    throw new KafkaException(
      `Failed to process Kafka consumer message for topic ${topic}: ${err.message}`,
      err
    );
  }
};
