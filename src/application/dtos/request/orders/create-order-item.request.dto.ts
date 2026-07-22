
export class CreateOrderItemRequestDto {
  productId!: string;

  quantity!: number;

  price!: number;

  name?: string;

  imageUrl?: string;
}
