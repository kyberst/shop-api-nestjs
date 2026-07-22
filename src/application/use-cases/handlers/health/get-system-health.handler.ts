import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { DatabaseHealthService } from '@/domain/services/database-health.service';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { AppException } from '@/shared/errors/app-exception';
import { DatabaseResultCode } from '@/shared/result-codes/database-result-codes';
import { KafkaResultCode } from '@/shared/result-codes/kafka-result-codes';
import { ApiResult } from '@/shared/types/api-result';
import { ResultInfo } from '@/shared/types/result-info';
import { GetSystemHealthQuery } from '@/application/use-cases/queries/health/get-system-health.query';
import { LoggerService } from '@/domain/services/logger.service';

@RequestHandler(GetSystemHealthQuery)
export class GetSystemHealthHandler implements IRequestHandler<GetSystemHealthQuery, ApiResult<any>> {
  constructor(
    private readonly dbHealth: DatabaseHealthService,
    private readonly messaging: MessageBroker,
    private readonly cache: CacheService,
    private readonly monitoring: MonitoringService,
    private readonly logger: LoggerService,
  ) {}

  async handle(query: GetSystemHealthQuery): Promise<ApiResult<any>> {
    const prismaConnected = this.dbHealth.isPrismaConnected();
    const mongoConnected = this.dbHealth.isMongooseConnected();
    const cacheConnected = this.cache.isConnected();
    const monitoringConnected = await this.monitoring.isConnected();

    if (!prismaConnected || !mongoConnected) {
      const details = {
        prisma: { connected: prismaConnected },
        mongodb: { connected: mongoConnected },
      };
      this.logger.warn(`Health check failed: One or more databases are offline. ${JSON.stringify(details)}`);
      throw new AppException(DatabaseResultCode.DATABASE_OFFLINE, details);
    }

    let prismaError: string | null = null;
    try {
      await this.dbHealth.testPrismaConnection();
    } catch (err: unknown) {
      prismaError = err instanceof Error ? err.message : String(err);
      this.logger.error(`Prisma connection test query failed: ${prismaError}`);
      throw new AppException(DatabaseResultCode.DATABASE_CONNECTION_FAILED, { error: prismaError });
    }

    const messagingEnabled = this.messaging.getIsEnabled();
    const messagingConnected = this.messaging.getIsConnected();

    if (messagingEnabled && !messagingConnected) {
      this.logger.warn('Health check failed: Messaging is enabled but connection is offline.');
      throw new AppException(KafkaResultCode.KAFKA_CONNECTION_FAILED, {
        messaging: { enabled: true, connected: false }
      });
    }

    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      databases: {
        prisma: {
          connected: true,
          activeTest: 'Success',
        },
        mongodb: {
          connected: true,
        },
        redis: {
          connected: cacheConnected,
        },
      },
      monitoring: {
        status: {
          connected: monitoringConnected,
        },
      },
      messaging: {
        broker: {
          enabled: messagingEnabled,
          connected: messagingConnected,
        },
      },
    };

    return ApiResult.FromInfo(
      ResultInfo.Ok('SYSTEM_HEALTHY', 'System is healthy'),
      healthData
    );
  }
}
