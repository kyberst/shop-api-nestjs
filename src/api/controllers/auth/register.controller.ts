import { Controller, Post, Body, UseInterceptors, Inject } from '@nestjs/common';
import { RegisterRequestDto } from '@/application/dtos/request/identity/register.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { RegisterCommand } from '@/application/use-cases/commands/identity/register.command';
import { AuthCookieInterceptor } from '@/api/interceptors/auth-cookie.interceptor';
import { RegisterResponseDto } from '@/application/dtos/response/identity/register.response.dto';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class RegisterController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto): Promise<ApiResult<RegisterResponseDto>> {
    return this.mediator.send(new RegisterCommand(registerDto));
  }
}
