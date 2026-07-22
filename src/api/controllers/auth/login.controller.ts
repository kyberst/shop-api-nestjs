import { Controller, Post, Body, UseInterceptors, Inject } from '@nestjs/common';
import { LoginRequestDto } from '@/application/dtos/request/identity/login.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { LoginCommand } from '@/application/use-cases/commands/identity/login.command';
import { AuthCookieInterceptor } from '@/api/interceptors/auth-cookie.interceptor';
import { LoginResponseDto } from '@/application/dtos/response/identity/login.response.dto';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class LoginController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginRequestDto): Promise<ApiResult<LoginResponseDto>> {
    return this.mediator.send(new LoginCommand(loginDto));
  }
}
