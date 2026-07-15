import { randomUUID } from 'crypto';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { OrderEntity } from '@/domain/entities/order.entity';
import { ApiResult } from '@/shared/types/api-result';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';
import { CreateOrderRequestDto } from '@/application/dtos/request/orders/create-order.request.dto';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

/**
 * Logic to create an order.
 */
export const createOrderLogic = async (
  orderRepository: OrderRepository,
  createOrderDto: CreateOrderRequestDto
): Promise<ApiResult<OrderResponseDto>> => {
  const customer = createOrderDto.customer || 'Guest';
  const customerEmail = createOrderDto.customerEmail || 'guest@example.com';

  const order = OrderEntity.create({
    id: createOrderDto.id || randomUUID(),
    userId: createOrderDto.userId,
    customer,
    customerEmail,
    items: createOrderDto.items.map((item: any) => ({
      id: item.productId,
      name: item.name || 'Product',
      price: item.price,
      quantity: item.quantity,
      imageUrl: item.imageUrl || '',
    })),
  });

  await orderRepository.save(order);

  const orderResponse: OrderResponseDto = {
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
  };

  return ApiResult.FromInfo(OrderResultCode.ORDER_CREATED, orderResponse);
};
