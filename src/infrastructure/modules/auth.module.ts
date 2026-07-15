import { Module } from '@nestjs/common';
import { LoginController } from '../../api/controllers/auth/login.controller';
import { RegisterController } from '../../api/controllers/auth/register.controller';
import { LogoutController } from '../../api/controllers/auth/logout.controller';
import { ForgotPasswordController } from '../../api/controllers/auth/forgot-password.controller';
import { LoginHandler } from '../../application/use-cases/handlers/identity/login.handler';
import { RegisterHandler } from '../../application/use-cases/handlers/identity/register.handler';
import { LogoutHandler } from '../../application/use-cases/handlers/identity/logout.handler';
import { ForgotPasswordHandler } from '../../application/use-cases/handlers/identity/forgot-password.handler';
import { KafkaModule } from './kafka.module';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { BcryptHashService } from '../security/bcrypt-hash.service';
import { JwtTokenService } from '../security/jwt-token.service';

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
    LoginHandler,
    RegisterHandler,
    LogoutHandler,
    ForgotPasswordHandler,
  ],
})
export class AuthModule {}
