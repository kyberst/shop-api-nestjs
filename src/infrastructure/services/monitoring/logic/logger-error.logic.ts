import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';

export const loggerErrorLogic = (
  monitoringService: MonitoringService,
  message: any,
  trace?: string,
  context?: string
): void => {
  monitoringService.log('error', message, context, trace);
};
