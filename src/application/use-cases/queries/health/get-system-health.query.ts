import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class GetSystemHealthQuery extends IRequest<ApiResult<any>> {
  readonly type = 'GetSystemHealthQuery';
}
