import { Controller, Post, Body, UseInterceptors, Inject } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { ForgotPasswordCommand } from '@/application/use-cases/commands/identity/forgot-password.command';
import { AuthCookieInterceptor } from '@/api/interceptors/auth-cookie.interceptor';
import { ForgotPasswordRequestDto } from '@/application/dtos/request/identity/forgot-password.request.dto';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class ForgotPasswordController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<ApiResult> {
    return this.mediator.send(new ForgotPasswordCommand(body.email, body.newPassword));
  }
}
