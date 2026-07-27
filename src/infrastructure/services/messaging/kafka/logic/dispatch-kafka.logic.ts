import { Producer } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';
import { KafkaException } from '@/infrastructure/exceptions/kafka.exception';

export const dispatchKafkaLogic = async (
  topic: string,
  message: any,
  producer: Producer | undefined,
  logger: LoggerService
): Promise<void> => {
  if (!producer) return;

  try {
    await producer.send({
      topic,
      messages: [{ value: JSON.stringify(message) }],
    });
  } catch (err: any) {
    logger.error(`Failed to send message to topic ${topic} via Kafka: ${err.message}`, err.stack);
    throw new KafkaException(
      `Failed to send message to topic ${topic} via Kafka: ${err.message}`,
      err
    );
  }
};
