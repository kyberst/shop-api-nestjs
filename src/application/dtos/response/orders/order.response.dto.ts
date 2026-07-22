import { OrderStatus } from '@/shared/enums/orders/order-status.enum';
import { OrderItemResponseDto } from './order-item.response.dto';

export interface OrderResponseDto {
  id: string;
  customer: string;
  customerEmail: string;
  date: string;
  total: number;
  status: OrderStatus;
  items: OrderItemResponseDto[];
  userId?: string;
}
