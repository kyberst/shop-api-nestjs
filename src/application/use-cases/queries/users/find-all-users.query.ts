import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

export class FindAllUsersQuery extends IRequest<ApiResult<ISanitizedUser[]>> {
  readonly type = 'FindAllUsersQuery';
}
