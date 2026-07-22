import { Controller, Post, UseInterceptors, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { LogoutCommand } from '@/application/use-cases/commands/identity/logout.command';
import { AuthCookieInterceptor } from '@/api/interceptors/auth-cookie.interceptor';

@Controller('auth')
@UseGuards(AuthGuard)
@UseInterceptors(AuthCookieInterceptor)
export class LogoutController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('logout')
  async logout(): Promise<ApiResult> {
    return this.mediator.send(new LogoutCommand()) as Promise<ApiResult>;
  }
}
