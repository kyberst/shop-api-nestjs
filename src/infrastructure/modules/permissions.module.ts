import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence.module';
import { KafkaModule } from './kafka.module';
import { GetRolePermissionsHandler } from '@/application/use-cases/handlers/permissions/get-role-permissions.handler';
import { UpdateRolePermissionsHandler } from '@/application/use-cases/handlers/permissions/update-role-permissions.handler';
import { RolePermissionsController } from '@/api/controllers/permissions/role-permissions.controller';
import { RolePermissionsUpdatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/permissions/role-permissions-updated.consumer';

import { RolePermissionRepository } from '@/domain/repositories/role-permission.repository';
import { RolePermissionQueryRepository } from '@/domain/repositories/role-permission.query.repository';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';

@Module({
  imports: [PersistenceModule, KafkaModule],
  controllers: [RolePermissionsController],
  providers: [
    {
      provide: GetRolePermissionsHandler,
      useFactory: (repo: RolePermissionQueryRepository) => {
        return new GetRolePermissionsHandler(repo);
      },
      inject: [RolePermissionQueryRepository],
    },
    {
      provide: UpdateRolePermissionsHandler,
      useFactory: (repo: RolePermissionRepository, broker: MessageBroker) => {
        return new UpdateRolePermissionsHandler(repo, broker);
      },
      inject: [RolePermissionRepository, MessageBroker],
    },
    RolePermissionsUpdatedConsumer,
  ],
  exports: [],
})
export class PermissionsModule {}
