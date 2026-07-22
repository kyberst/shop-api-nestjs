import { Order } from '@/domain/entities/order.entity';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

export class OrderMapper {
  static toResponse(order: Order): OrderResponseDto {
    return {
      id: order.id,
      customer: order.customer,
      customerEmail: order.customerEmail,
      date: order.createdAt instanceof Date 
        ? order.createdAt.toISOString() 
        : (order.date || new Date().toISOString()),
      total: order.total,
      status: order.status,
      userId: order.userId,
      items: (order.items || []).map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl || ''
      }))
    };
  }

  static toResponseList(orders: Order[]): OrderResponseDto[] {
    return orders.map(order => this.toResponse(order));
  }
}
