export abstract class DatabaseHealthService {
  abstract isPrismaConnected(): boolean;
  abstract isMongooseConnected(): boolean;
  abstract testPrismaConnection(): Promise<void>;
}
