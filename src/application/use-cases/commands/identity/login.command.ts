import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { LoginRequestDto } from '@/application/dtos/request/identity/login.request.dto';
import { LoginResponseDto } from '@/application/dtos/response/identity/login.response.dto';

export class LoginCommand extends IRequest<ApiResult<LoginResponseDto>> {
  constructor(public readonly dto: LoginRequestDto) {
    super();}
}
