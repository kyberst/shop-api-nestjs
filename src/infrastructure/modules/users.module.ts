import { Module } from '@nestjs/common';
import { FindAllUsersController } from '../../api/controllers/users/find-all-users.controller';
import { UpdateUserRoleController } from '../../api/controllers/users/update-user-role.controller';
import { FindAllUsersHandler } from '../../application/use-cases/handlers/users/find-all-users.handler';
import { UpdateUserRoleHandler } from '../../application/use-cases/handlers/users/update-user-role.handler';
import { PersistenceModule } from './persistence.module';
import { MediatorModule } from '../../infrastructure/mediator/mediator.module';

@Module({
  imports: [PersistenceModule, MediatorModule],
  controllers: [FindAllUsersController, UpdateUserRoleController],
  providers: [
    FindAllUsersHandler,
    UpdateUserRoleHandler,
  ],
})
export class UsersModule {}
