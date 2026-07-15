import { Producer } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';
import { AppException } from '@/shared/errors/app-exception';
import { KafkaResultCode } from '@/shared/result-codes/kafka-result-codes';

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
    throw new AppException(KafkaResultCode.KAFKA_CONNECTION_FAILED, {
      message: `Failed to send message to topic ${topic} via Kafka`,
      error: err.message,
    });
  }
};
