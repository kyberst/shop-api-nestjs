import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class UpdateUserRoleCommand extends IRequest<ApiResult<void>> {
  readonly type = 'UpdateUserRoleCommand';
  constructor(
    public readonly userId: string,
    public readonly role: 'admin' | 'sales' | 'user'
  ) {
    super();
  }
}
