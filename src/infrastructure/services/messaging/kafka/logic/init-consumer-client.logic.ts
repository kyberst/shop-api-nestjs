import { Kafka, logLevel } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';
import { parseBrokersLogic } from './parse-brokers.logic';
import { AppException } from '@/shared/errors/app-exception';
import { KafkaResultCode } from '@/shared/result-codes/kafka-result-codes';

export const initConsumerClientLogic = (logger: LoggerService): Kafka | undefined => {
  if (!process.env.KAFKA_BROKER || 
      process.env.KAFKA_BROKER === 'undefined' || 
      process.env.KAFKA_BROKER.trim() === '' ||
      !process.env.KAFKA_USER || 
      !process.env.KAFKA_PASSWORD) {
    logger.log('Kafka environment variables are missing or invalid. Kafka consumer will be disabled.');
    return undefined;
  }

  const brokers = parseBrokersLogic(process.env.KAFKA_BROKER);
  if (brokers.length === 0) {
    logger.log('Kafka brokers list is empty. Kafka consumer will be disabled.');
    return undefined;
  }

  try {
    const kafka = new Kafka({
      clientId: process.env.KAFKA_CLIENT_ID || 'ecommerce-app',
      brokers,
      ssl: true,
      sasl: {
        mechanism: 'scram-sha-256',
        username: process.env.KAFKA_USER,
        password: process.env.KAFKA_PASSWORD,
      },
      retry: {
        initialRetryTime: 300,
        retries: 0,
      },
      logLevel: logLevel.NOTHING,
    });
    return kafka;
  } catch (err: any) {
    logger.error(`Failed to initialize Kafka consumer client: ${err.message}`, err.stack);
    return undefined;
  }
};
