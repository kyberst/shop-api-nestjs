import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { CreatePaymentIntentRequestDto } from '@/application/dtos/request/payment/create-payment-intent.request.dto';
import { PaymentIntentResponseDto } from '@/application/dtos/response/payment/payment-intent.response.dto';

export class CreatePaymentIntentCommand extends IRequest<ApiResult<PaymentIntentResponseDto>> {
  constructor(public readonly dto: CreatePaymentIntentRequestDto) {
    super();}
}
