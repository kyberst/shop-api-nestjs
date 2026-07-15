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
  } catch (error: any) {
    logger.warn(`Failed to connect to Kafka. Message broker features will be disabled. Reason: ${error.message}`);
    return false;
  }
};
