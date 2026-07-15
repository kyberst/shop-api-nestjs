import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { CreateOrderRequestDto } from '@/application/dtos/request/orders/create-order.request.dto';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

export class CreateOrderCommand extends IRequest<ApiResult<OrderResponseDto>> {
  constructor(public readonly dto: CreateOrderRequestDto) {
    super();}
}
