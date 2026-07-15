import { Module } from '@nestjs/common';
import { PersistenceModule } from '../infrastructure/modules/persistence.module';
import { GetRolePermissionsHandler } from '../application/use-cases/handlers/permissions/get-role-permissions.handler';
import { UpdateRolePermissionsHandler } from '../application/use-cases/handlers/permissions/update-role-permissions.handler';
import { RolePermissionsController } from './controllers/permissions/role-permissions.controller';
import { KafkaModule } from '../infrastructure/modules/kafka.module';
import { RolePermissionsUpdatedConsumer } from '../infrastructure/services/messaging/kafka/consumers/permissions/role-permissions-updated.consumer';

@Module({
  imports: [PersistenceModule, KafkaModule],
  controllers: [RolePermissionsController],
  providers: [
    GetRolePermissionsHandler,
    UpdateRolePermissionsHandler,
    RolePermissionsUpdatedConsumer,
  ],
  exports: [],
})
export class PermissionsModule {}
