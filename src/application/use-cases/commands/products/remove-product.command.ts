import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class RemoveProductCommand extends IRequest<ApiResult> {
  constructor(public readonly id: string) {
    super();}
}
