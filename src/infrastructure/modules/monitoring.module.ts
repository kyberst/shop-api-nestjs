import { Module, Global } from '@nestjs/common';
import { OpenSearchService } from '../services/monitoring/opensearch/opensearch.service';
import { MonitoringLoggerService } from '../services/monitoring/monitoring-logger.service';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { LoggerService } from '@/domain/services/logger.service';

@Global()
@Module({
  providers: [
    OpenSearchService,
    {
      provide: MonitoringService,
      useExisting: OpenSearchService,
    },
    MonitoringLoggerService,
    {
      provide: LoggerService,
      useExisting: MonitoringLoggerService,
    },
  ],
  exports: [OpenSearchService, MonitoringService, MonitoringLoggerService, LoggerService],
})
export class MonitoringModule {}
