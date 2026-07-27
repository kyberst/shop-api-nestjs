/**
 * Agnostic infrastructure exception thrown when a Kafka operation fails.
 * Completely independent of Application layer result codes.
 */
export class KafkaException extends Error {
  constructor(
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'KafkaException';
  }
}
