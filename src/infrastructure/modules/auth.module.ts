import { Module } from '@nestjs/common';
import { LoginController } from '@/api/controllers/auth/login.controller';
import { RegisterController } from '@/api/controllers/auth/register.controller';
import { LogoutController } from '@/api/controllers/auth/logout.controller';
import { ForgotPasswordController } from '@/api/controllers/auth/forgot-password.controller';
import { LoginHandler } from '@/application/use-cases/handlers/identity/login.handler';
import { RegisterHandler } from '@/application/use-cases/handlers/identity/register.handler';
import { LogoutHandler } from '@/application/use-cases/handlers/identity/logout.handler';
import { ForgotPasswordHandler } from '@/application/use-cases/handlers/identity/forgot-password.handler';
import { KafkaModule } from './kafka.module';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { BcryptHashService } from '@/infrastructure/security/bcrypt-hash.service';
import { JwtTokenService } from '@/infrastructure/security/jwt-token.service';
import { UserRepository } from '@/domain/repositories/user.repository';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';

@Module({
  imports: [KafkaModule],
  controllers: [
    LoginController,
    RegisterController,
    LogoutController,
    ForgotPasswordController,
  ],
  providers: [
    {
      provide: IHashService,
      useClass: BcryptHashService,
    },
    {
      provide: ITokenService,
      useClass: JwtTokenService,
    },
    {
      provide: LoginHandler,
      useFactory: (repo: UserRepository, hash: IHashService, token: ITokenService) => {
        return new LoginHandler(repo, hash, token);
      },
      inject: [UserRepository, IHashService, ITokenService],
    },
    {
      provide: RegisterHandler,
      useFactory: (repo: UserRepository, broker: MessageBroker, hash: IHashService, token: ITokenService) => {
        return new RegisterHandler(repo, broker, hash, token);
      },
      inject: [UserRepository, MessageBroker, IHashService, ITokenService],
    },
    {
      provide: LogoutHandler,
      useFactory: () => {
        return new LogoutHandler();
      },
      inject: [],
    },
    {
      provide: ForgotPasswordHandler,
      useFactory: (repo: UserRepository, hash: IHashService) => {
        return new ForgotPasswordHandler(repo, hash);
      },
      inject: [UserRepository, IHashService],
    },
  ],
})
export class AuthModule {}
