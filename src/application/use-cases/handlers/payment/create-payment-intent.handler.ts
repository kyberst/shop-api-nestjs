import { ApiResult } from '@/shared/types/api-result';
import { PaymentService } from '@/application/use-cases/logic/payment/payment.service';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { CreatePaymentIntentCommand } from '@/application/use-cases/commands/payment/create-payment-intent.command';
import { PaymentIntentResponseDto } from '@/application/dtos/response/payment/payment-intent.response.dto';


@RequestHandler(CreatePaymentIntentCommand)
export class CreatePaymentIntentHandler implements IRequestHandler<CreatePaymentIntentCommand, ApiResult<PaymentIntentResponseDto>> {
  constructor(private readonly paymentService: PaymentService) {}

  async handle(command: CreatePaymentIntentCommand): Promise<ApiResult<PaymentIntentResponseDto>> {
    return this.paymentService.createPaymentIntent(command.dto.items);
  }
}
