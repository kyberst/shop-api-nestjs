import { OrderRepository } from '@/domain/repositories/order.repository';
import { ApiResult } from '@/shared/types/api-result';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';
import { UpdateOrderStatusRequestDto } from '@/application/dtos/request/orders/update-order-status.request.dto';

/**
 * Logic to update order status.
 */
export const updateOrderStatusLogic = async (
  orderRepository: OrderRepository,
  id: string,
  updateOrderStatusDto: UpdateOrderStatusRequestDto
): Promise<ApiResult> => {
  const mutation = await orderRepository.updateStatus(id, updateOrderStatusDto.status);

  if (mutation.affectedCount === 0) {
    return ApiResult.FromInfo(OrderResultCode.ORDER_NOT_FOUND);
  }

  return ApiResult.FromInfo(OrderResultCode.ORDER_STATUS_UPDATED);
};
