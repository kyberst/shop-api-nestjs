import { MonitoringService } from '@/shared/interfaces/monitoring/monitoring.interface';

export const loggerLogLogic = (
  monitoringService: MonitoringService,
  message: any,
  context?: string
): void => {
  monitoringService.log('info', message, context);
};
