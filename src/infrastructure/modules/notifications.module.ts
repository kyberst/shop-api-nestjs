import { Module } from '@nestjs/common';
import { NotificationGateway } from '../gateways/notification.gateway';

@Module({
  providers: [
    NotificationGateway,
    {
      provide: 'INotificationService',
      useExisting: NotificationGateway,
    },
  ],
  exports: ['INotificationService'],
})
export class NotificationsModule {}
