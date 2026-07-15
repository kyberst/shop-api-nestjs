import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class RemoveCategoryCommand extends IRequest<ApiResult> {
  constructor(public readonly id: string) {
    super();}
}
