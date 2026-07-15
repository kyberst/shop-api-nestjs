import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { LogoutCommand } from '@/application/use-cases/commands/identity/logout.command';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class LogoutController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post('logout')
  async logout(): Promise<ApiResult> {
    return this.mediator.send(new LogoutCommand()) as Promise<ApiResult>;
  }
}
