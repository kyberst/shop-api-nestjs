/**
 * Agnostic infrastructure exception thrown when a database operation fails.
 * Completely independent of Application layer result codes.
 */
export class DatabaseException extends Error {
  constructor(
    message: string,
    public readonly details?: any
  ) {
    super(message);
    this.name = 'DatabaseException';
  }
}
