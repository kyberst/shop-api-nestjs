
export class PaymentItemRequestDto {
  price!: number;

  quantity!: number;
}

export class CreatePaymentIntentRequestDto {
  items!: PaymentItemRequestDto[];
}
