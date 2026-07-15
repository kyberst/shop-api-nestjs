import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';

export const loggerVerboseLogic = (
  monitoringService: MonitoringService,
  message: any,
  context?: string
): void => {
  monitoringService.log('verbose', message, context);
};
