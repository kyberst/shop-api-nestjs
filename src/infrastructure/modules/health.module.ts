import { Module } from '@nestjs/common';
import { HealthController } from '@/api/controllers/health/health.controller';
import { KafkaModule } from './kafka.module';
import { GetSystemHealthHandler } from '@/application/use-cases/handlers/health/get-system-health.handler';
import { DatabaseHealthService } from '@/domain/services/database-health.service';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { CacheService } from '@/shared/interfaces/cache/cache.interface';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { LoggerService } from '@/domain/services/logger.service';

@Module({
  imports: [KafkaModule],
  controllers: [HealthController],
  providers: [
    {
      provide: GetSystemHealthHandler,
      useFactory: (
        dbHealth: DatabaseHealthService,
        messaging: MessageBroker,
        cache: CacheService,
        monitoring: MonitoringService,
        logger: LoggerService,
      ) => {
        return new GetSystemHealthHandler(dbHealth, messaging, cache, monitoring, logger);
      },
      inject: [DatabaseHealthService, MessageBroker, CacheService, MonitoringService, LoggerService],
    },
  ],
})
export class HealthModule {}
