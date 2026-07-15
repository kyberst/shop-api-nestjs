import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { RegisterRequestDto } from '@/application/dtos/request/identity/register.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { RegisterCommand } from '@/application/use-cases/commands/identity/register.command';
import { AuthCookieInterceptor } from '../../interceptors/auth-cookie.interceptor';
import { RegisterResponseDto } from '@/application/dtos/response/identity/register.response.dto';

@Controller('auth')
@UseInterceptors(AuthCookieInterceptor)
export class RegisterController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterRequestDto): Promise<ApiResult<RegisterResponseDto>> {
    return this.mediator.send(new RegisterCommand(registerDto));
  }
}
