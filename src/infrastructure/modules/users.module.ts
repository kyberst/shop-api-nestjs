import { Module } from '@nestjs/common';
import { FindAllUsersController } from '@/api/controllers/users/find-all-users.controller';
import { UpdateUserRoleController } from '@/api/controllers/users/update-user-role.controller';
import { FindAllUsersHandler } from '@/application/use-cases/handlers/users/find-all-users.handler';
import { UpdateUserRoleHandler } from '@/application/use-cases/handlers/users/update-user-role.handler';
import { PersistenceModule } from './persistence.module';
import { MediatorModule } from '@/infrastructure/mediator/mediator.module';
import { UserRepository } from '@/domain/repositories/user.repository';

@Module({
  imports: [PersistenceModule, MediatorModule],
  controllers: [FindAllUsersController, UpdateUserRoleController],
  providers: [
    {
      provide: FindAllUsersHandler,
      useFactory: (repo: UserRepository) => {
        return new FindAllUsersHandler(repo);
      },
      inject: [UserRepository],
    },
    {
      provide: UpdateUserRoleHandler,
      useFactory: (repo: UserRepository) => {
        return new UpdateUserRoleHandler(repo);
      },
      inject: [UserRepository],
    },
  ],
})
export class UsersModule {}
