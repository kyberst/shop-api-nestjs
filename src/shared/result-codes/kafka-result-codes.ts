import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class KafkaResultCode {
  static readonly KAFKA_CONFIG_MISSING = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'KAFKA_CONFIG_MISSING', 'Kafka environment variables are not defined');
  static readonly KAFKA_CONNECTION_FAILED = new ResultInfo(false, HttpStatus.SERVICE_UNAVAILABLE, 'KAFKA_CONNECTION_FAILED', 'Failed to connect to Kafka message broker');
}
