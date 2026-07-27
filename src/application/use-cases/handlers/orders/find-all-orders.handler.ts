import { OrderQueryRepository } from '@/domain/repositories/order.query.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { FindAllOrdersQuery } from '@/application/use-cases/queries/orders/find-all-orders.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { findAllOrdersLogic } from '@/application/use-cases/logic/orders/find-all-orders.logic';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';


@RequestHandler(FindAllOrdersQuery)
export class FindAllOrdersHandler implements IRequestHandler<FindAllOrdersQuery, ApiResult<PaginatedData<OrderResponseDto>>> {
  constructor(
    private readonly orderRepository: OrderQueryRepository
  ) {}

  async handle(command: FindAllOrdersQuery): Promise<ApiResult<PaginatedData<OrderResponseDto>>> {
      return await findAllOrdersLogic(this.orderRepository, command.options, command.currentUser);
  }
}

