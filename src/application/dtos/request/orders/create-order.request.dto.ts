
export class CreateOrderItemRequestDto {
  productId!: string;

  quantity!: number;

  price!: number;

  name?: string;

  imageUrl?: string;
}

export class CreateOrderRequestDto {
  id?: string;

  userId!: string;

  customer?: string;

  customerEmail?: string;

  items!: CreateOrderItemRequestDto[];

  total!: number;

  shippingAddress!: string;
}
