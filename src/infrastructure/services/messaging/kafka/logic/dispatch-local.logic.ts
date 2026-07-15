import { LoggerService } from '@/domain/services/logger.service';
import { AppException } from '@/shared/errors/app-exception';
import { KafkaResultCode } from '@/shared/result-codes/kafka-result-codes';

export type LocalEventCallback = (topic: string, message: any) => Promise<void>;

export const dispatchLocalLogic = async (
  topic: string,
  message: any,
  listeners: LocalEventCallback[],
  logger: LoggerService
): Promise<void> => {
  const results = await Promise.allSettled(
    listeners.map(listener => listener(topic, message))
  );

  const errors = results
    .filter((res): res is PromiseRejectedResult => res.status === 'rejected')
    .map(res => res.reason);

  if (errors.length > 0) {
    const errorDetails = errors.map(e => (e instanceof Error ? e.message : String(e))).join(', ');
    logger.error(`Failed to process ${errors.length} local event listeners for topic ${topic}: ${errorDetails}`);

    throw new AppException(KafkaResultCode.KAFKA_CONNECTION_FAILED, {
      message: `Failed to process some local event listeners for topic ${topic}`,
      errors: errors.map(e => (e instanceof Error ? e.message : String(e))),
    });
  }
};
