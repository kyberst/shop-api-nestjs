import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class GetChatHistoryCommand extends IRequest<ApiResult<any>> {
  constructor(public readonly userId: string) {
    super();
  }
}
