import { PaymentItemRequestDto } from './payment-item.request.dto';

export class CreatePaymentIntentRequestDto {
  items!: PaymentItemRequestDto[];
}
