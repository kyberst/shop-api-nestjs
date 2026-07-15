import { OrderStatus } from '@/shared/enums/orders/order-status.enum';

export interface OrderItemResponseDto {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

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
