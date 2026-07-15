import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { RegisterRequestDto } from '@/application/dtos/request/identity/register.request.dto';
import { RegisterResponseDto } from '@/application/dtos/response/identity/register.response.dto';

export class RegisterCommand extends IRequest<ApiResult<RegisterResponseDto>> {
  constructor(public readonly dto: RegisterRequestDto) {
    super();}
}
