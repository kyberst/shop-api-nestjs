import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';

export const loggerDebugLogic = (
  monitoringService: MonitoringService,
  message: any,
  context?: string
): void => {
  monitoringService.log('debug', message, context);
};
