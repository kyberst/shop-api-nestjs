export abstract class MonitoringService {
  abstract log(level: string, message: string, context?: string, trace?: any): Promise<void>;
  abstract isConnected(): Promise<boolean>;
}
