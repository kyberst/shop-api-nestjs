/**
 * General agnostic infrastructure exception.
 * Used for infrastructure errors that are independent of the Application layer.
 */
export class InfrastructureException extends Error {
  constructor(
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'InfrastructureException';
  }
}
