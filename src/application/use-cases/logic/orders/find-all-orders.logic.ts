import { OrderRepository } from '@/domain/repositories/order.repository';
import { ApiResult } from '@/shared/types/api-result';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';
import { OrderQueryOptions } from '@/domain/repositories/order.repository';
import { PaginatedData } from '@/domain/types/paginated-data';
import { RequestUser } from '@/shared/types/auth.interface';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

/**
 * Logic to find all orders with filters and pagination.
 */
export const findAllOrdersLogic = async (
  orderRepository: OrderRepository,
  options?: OrderQueryOptions,
  currentUser?: RequestUser
): Promise<ApiResult<PaginatedData<OrderResponseDto>>> => {
  const finalOptions: OrderQueryOptions = { ...options };

  if (currentUser && currentUser.role === 'user') {
    finalOptions.customerEmail = currentUser.email;
    finalOptions.userId = currentUser.id;
  }

  const ordersResult = await orderRepository.findAll(finalOptions);
  
  const mappedData: OrderResponseDto[] = ordersResult.items.map(order => ({
    id: order.id,
    customer: order.customer,
    customerEmail: order.customerEmail,
    date: order.createdAt?.toISOString() || new Date().toISOString(),
    total: order.total,
    status: order.status,
    userId: order.userId,
    items: order.items.map(item => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl
    }))
  }));

  const paginatedDto: PaginatedData<OrderResponseDto> = {
    items: mappedData,
    total: ordersResult.total,
    page: ordersResult.page,
    pageSize: ordersResult.pageSize
  };

  return ApiResult.FromInfo(OrderResultCode.ORDERS_FOUND, paginatedDto);
};


