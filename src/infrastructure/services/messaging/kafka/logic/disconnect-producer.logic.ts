import { Producer } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';

export const disconnectProducerLogic = async (
  producer: Producer | undefined,
  isConnected: boolean,
  logger: LoggerService
): Promise<void> => {
  if (isConnected && producer) {
    try {
      await producer.disconnect();
    } catch (err: any) {
      logger.error(`Failed to disconnect Kafka producer: ${err.message}`, err.stack);
    }
  }
};
