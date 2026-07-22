import { Producer } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';

export const connectProducerLogic = async (
  producer: Producer | undefined,
  logger: LoggerService
): Promise<boolean> => {
  if (!producer) return false;

  try {
    await producer.connect();
    logger.log('Connected to Kafka');
    return true;
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.log(`Failed to connect to Kafka. Message broker features will be disabled. Reason: ${message}`);
    return false;
  }
};
