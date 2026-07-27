import { OrderQueryRepository } from '@/domain/repositories/order.query.repository';
import { ApiResult } from '@/shared/types/api-result';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';
import { OrderQueryOptions } from '@/domain/interfaces/order-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';
import { RequestUser } from '@/shared/types/auth.interface';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';
import { OrderMapper } from '@/application/mappers/order.mapper';

/**
 * Logic to find all orders with filters and pagination.
 */
export const findAllOrdersLogic = async (
  orderRepository: OrderQueryRepository,
  options?: OrderQueryOptions,
  currentUser?: RequestUser
): Promise<ApiResult<PaginatedData<OrderResponseDto>>> => {
  const finalOptions: OrderQueryOptions = { ...options };

  if (currentUser && currentUser.role === 'user') {
    finalOptions.customerEmail = currentUser.email;
    finalOptions.userId = currentUser.id;
  }

  const ordersResult = await orderRepository.findAll(finalOptions);
  
  const mappedData = OrderMapper.toResponseList(ordersResult.items);

  const paginatedDto: PaginatedData<OrderResponseDto> = {
    items: mappedData,
    total: ordersResult.total,
    page: ordersResult.page,
    pageSize: ordersResult.pageSize
  };

  return ApiResult.FromInfo(OrderResultCode.ORDERS_FOUND, paginatedDto);
};


