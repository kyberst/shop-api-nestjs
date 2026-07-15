import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Client } from '@opensearch-project/opensearch';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { onModuleInitLogic } from './logic/on-module-init.logic';
import { ensureIndexLogic } from './logic/ensure-index.logic';
import { logLogic } from './logic/log.logic';
import { isConnectedLogic } from './logic/is-connected.logic';

@Injectable()
export class OpenSearchService extends MonitoringService implements OnModuleInit {
  private client?: Client;
  private readonly logger = new Logger(OpenSearchService.name);
  private readonly indexName = 'logs';

  onModuleInit() {
    this.client = onModuleInitLogic(this.logger, () => this.ensureIndex());
  }

  private async ensureIndex() {
    await ensureIndexLogic(this.client, this.indexName, this.logger);
  }

  async log(level: string, message: string, context?: string, trace?: any) {
    await logLogic(this.client, this.indexName, level, message, context, trace);
  }

  async isConnected(): Promise<boolean> {
    return isConnectedLogic(this.client);
  }
}
