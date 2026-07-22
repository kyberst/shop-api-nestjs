import { CreateOrderItemRequestDto } from './create-order-item.request.dto';

export class CreateOrderRequestDto {
  id?: string;

  userId!: string;

  customer?: string;

  customerEmail?: string;

  items!: CreateOrderItemRequestDto[];

  total!: number;

  shippingAddress!: string;
}
