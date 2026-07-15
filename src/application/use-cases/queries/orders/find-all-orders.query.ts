import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { OrderQueryOptions } from '@/domain/repositories/order.repository';
import { PaginatedData } from '@/domain/types/paginated-data';
import { RequestUser } from '@/shared/types/auth.interface';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

export class FindAllOrdersQuery extends IRequest<ApiResult<PaginatedData<OrderResponseDto>>> {
  constructor(
    public readonly options?: OrderQueryOptions,
    public readonly currentUser?: RequestUser
  ) {
    super();}
}

