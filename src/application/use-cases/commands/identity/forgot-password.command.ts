import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class ForgotPasswordCommand extends IRequest<ApiResult> {
  constructor(
    public readonly email: string,
    public readonly newPassword?: string
  ) {
    super();}
}
