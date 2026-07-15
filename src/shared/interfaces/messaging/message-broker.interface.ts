/**
 * Generic class for message broker integration (e.g., Kafka, RabbitMQ, etc.).
 * decouples the application layer from specific messaging libraries or implementations.
 */
export abstract class MessageBroker {
  abstract send(topic: string, message: any): Promise<void>;
  abstract getIsEnabled(): boolean;
  abstract getIsConnected(): boolean;
}
