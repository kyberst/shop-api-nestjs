import { Module } from '@nestjs/common';
import { PersistenceModule } from './persistence.module';
import { KafkaModule } from './kafka.module';
import { GetRolePermissionsHandler } from '../../application/use-cases/handlers/permissions/get-role-permissions.handler';
import { UpdateRolePermissionsHandler } from '../../application/use-cases/handlers/permissions/update-role-permissions.handler';
import { RolePermissionsController } from '../../api/controllers/permissions/role-permissions.controller';
import { RolePermissionsUpdatedConsumer } from '../services/messaging/kafka/consumers/permissions/role-permissions-updated.consumer';

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
