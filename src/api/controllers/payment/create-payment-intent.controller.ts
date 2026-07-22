import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { CreatePaymentIntentRequestDto } from '@/application/dtos/request/payment/create-payment-intent.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { CreatePaymentIntentCommand } from '@/application/use-cases/commands/payment/create-payment-intent.command';
import { PaymentIntentResponseDto } from '@/application/dtos/response/payment/payment-intent.response.dto';

@Controller('create-payment-intent')
export class CreatePaymentIntentController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post()
  async createPaymentIntent(@Body() createPaymentIntentDto: CreatePaymentIntentRequestDto): Promise<ApiResult<PaymentIntentResponseDto>> {
    return this.mediator.send(new CreatePaymentIntentCommand(createPaymentIntentDto));
  }
}
