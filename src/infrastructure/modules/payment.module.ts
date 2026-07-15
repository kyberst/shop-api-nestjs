import { Module } from '@nestjs/common';
import { CreatePaymentIntentController } from '../../api/controllers/payment/create-payment-intent.controller';
import { PaymentService } from '../../application/use-cases/logic/payment/payment.service';
import { CreatePaymentIntentHandler } from '../../application/use-cases/handlers/payment/create-payment-intent.handler';

@Module({
  controllers: [CreatePaymentIntentController],
  providers: [
    PaymentService,
    CreatePaymentIntentHandler
  ]
})
export class PaymentModule {}
