import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { UpdateOrderStatusRequestDto } from '@/application/dtos/request/orders/update-order-status.request.dto';

export class UpdateOrderStatusCommand extends IRequest<ApiResult> {
  constructor(
    public readonly id: string,
    public readonly dto: UpdateOrderStatusRequestDto
  ) {
    super();}
}
