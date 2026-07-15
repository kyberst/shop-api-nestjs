import { Controller, Post, Body } from '@nestjs/common';
import { CreatePaymentIntentRequestDto } from '@/application/dtos/request/payment/create-payment-intent.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { CreatePaymentIntentCommand } from '@/application/use-cases/commands/payment/create-payment-intent.command';
import { PaymentIntentResponseDto } from '@/application/dtos/response/payment/payment-intent.response.dto';

@Controller('create-payment-intent')
export class CreatePaymentIntentController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post()
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentRequestDto): Promise<ApiResult<PaymentIntentResponseDto>> {
    return this.mediator.send(new CreatePaymentIntentCommand(createPaymentIntentDto));
  }
}
