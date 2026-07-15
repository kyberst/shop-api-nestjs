import { LoggerService as NestLoggerService, Injectable } from '@nestjs/common';
import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';
import { LoggerService } from '@/domain/services/logger.service';
import { loggerLogLogic } from './logic/logger-log.logic';
import { loggerErrorLogic } from './logic/logger-error.logic';
import { loggerWarnLogic } from './logic/logger-warn.logic';
import { loggerDebugLogic } from './logic/logger-debug.logic';
import { loggerVerboseLogic } from './logic/logger-verbose.logic';

@Injectable()
export class MonitoringLoggerService extends LoggerService implements NestLoggerService {
  constructor(
    private readonly monitoringService: MonitoringService
  ) {
    super();
  }

  log(message: any, context?: string) {
    loggerLogLogic(this.monitoringService, message, context);
  }

  error(message: any, trace?: string, context?: string) {
    loggerErrorLogic(this.monitoringService, message, trace, context);
  }

  warn(message: any, context?: string) {
    loggerWarnLogic(this.monitoringService, message, context);
  }

  debug(message: any, context?: string) {
    loggerDebugLogic(this.monitoringService, message, context);
  }

  verbose(message: any, context?: string) {
    loggerVerboseLogic(this.monitoringService, message, context);
  }
}
