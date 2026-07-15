import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';

export const loggerWarnLogic = (
  monitoringService: MonitoringService,
  message: any,
  context?: string
): void => {
  monitoringService.log('warn', message, context);
};
