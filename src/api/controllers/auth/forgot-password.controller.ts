import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { ForgotPasswordCommand } from '@/application/use-cases/commands/identity/forgot-password.command';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { ForgotPasswordRequestDto } from '@/application/dtos/request/identity/forgot-password.request.dto';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class ForgotPasswordController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post('forgot-password')
  async forgotPassword(@Body() body: ForgotPasswordRequestDto): Promise<ApiResult> {
    return this.mediator.send(new ForgotPasswordCommand(body.email, body.newPassword));
  }
}
