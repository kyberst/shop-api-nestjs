import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { LoggerService } from '@/domain/services/logger.service';
import { IModuleConsumer, registerConsumerLogic } from './logic/register-consumer.logic';
import { initConsumerClientLogic } from './logic/init-consumer-client.logic';
import { startConsumerLogic } from './logic/start-consumer.logic';

@Injectable()
export class KafkaConsumerService implements OnApplicationBootstrap {
  private kafka?: Kafka;
  private isEnabled = false;
  private consumers: IModuleConsumer[] = [];

  constructor(
    private readonly logger: LoggerService
  ) {
    this.kafka = initConsumerClientLogic(this.logger);
    if (this.kafka) {
      this.isEnabled = true;
    }
  }

  registerConsumer(consumer: IModuleConsumer) {
    registerConsumerLogic(consumer, this.consumers, this.logger);
  }

  async onApplicationBootstrap() {
    if (!this.isEnabled || !this.kafka) {
      this.logger.log('Kafka is disabled. Relying entirely on local in-memory event-driven CQRS handlers.');
      return;
    }

    this.logger.log(`Starting ${this.consumers.length} modular Kafka consumers...`);

    for (const c of this.consumers) {
      startConsumerLogic(this.kafka, c, this.logger);
    }
  }

  public getIsEnabled(): boolean { return this.isEnabled; }
}
