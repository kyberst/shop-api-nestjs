export abstract class CacheService {
  abstract getClient(): any;
  abstract isConnected(): boolean;
}
