import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka, Producer } from 'kafkajs';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { LoggerService } from '@/domain/services/logger.service';
import { initKafkaLogic } from './logic/init-kafka.logic';
import { connectProducerLogic } from './logic/connect-producer.logic';
import { disconnectProducerLogic } from './logic/disconnect-producer.logic';
import { dispatchLocalLogic, LocalEventCallback } from './logic/dispatch-local.logic';
import { dispatchKafkaLogic } from './logic/dispatch-kafka.logic';

@Injectable()
export class KafkaService extends MessageBroker implements OnModuleInit, OnModuleDestroy {
  private static localListeners: LocalEventCallback[] = [];
  private kafka?: Kafka;
  private producer?: Producer;
  private isConnected = false;
  private isEnabled = false;

  public static registerLocalListener(callback: LocalEventCallback) {
    this.localListeners.push(callback);
  }

  constructor(
    private readonly logger: LoggerService
  ) {
    super();
    const init = initKafkaLogic(this.logger);
    if (init) {
      this.kafka = init.kafka;
      this.producer = init.producer;
      this.isEnabled = true;
    }
  }

  async onModuleInit() {
    if (this.isEnabled && this.producer) {
      this.isConnected = await connectProducerLogic(this.producer, this.logger);
      if (!this.isConnected) this.isEnabled = false;
    }
  }

  async onModuleDestroy() {
    await disconnectProducerLogic(this.producer, this.isConnected, this.logger);
  }

  async send(topic: string, message: any) {
    await dispatchLocalLogic(topic, message, KafkaService.localListeners, this.logger);
    if (this.isConnected && this.producer) {
      await dispatchKafkaLogic(topic, message, this.producer, this.logger);
    }
  }

  public getIsEnabled(): boolean { return this.isEnabled; }
  public getIsConnected(): boolean { return this.isConnected; }
}
