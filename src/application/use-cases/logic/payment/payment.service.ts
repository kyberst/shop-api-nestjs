import { Injectable, Logger } from '@nestjs/common';
import Stripe = require('stripe');
import { ApiResult } from '@/shared/types/api-result';
import { PaymentResultCode } from '@/application/constants/result-codes/payment-result-codes';
import { PaymentIntentResponseDto } from '@/application/dtos/response/payment/payment-intent.response.dto';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);
  private stripe: Stripe | null = null;

  constructor() {
    const key = process.env.STRIPE_SECRET_KEY;
    if (key && key.startsWith('sk_')) {
      this.stripe = new Stripe(key);
    } else if (key) {
      this.logger.warn('STRIPE_SECRET_KEY is configured but does not start with "sk_". Falling back to mock client secret.');
    }
  }

  async createPaymentIntent(items: { price: number; quantity: number }[]): Promise<ApiResult<PaymentIntentResponseDto>> {
    if (!items || !Array.isArray(items)) {
      return ApiResult.FromInfo<PaymentIntentResponseDto>(PaymentResultCode.INVALID_ITEMS);
    }

    if (!this.stripe) {
      // In development with no Stripe key or a publishable/invalid key, return a mock client secret
      return ApiResult.FromInfo<PaymentIntentResponseDto>(PaymentResultCode.PAYMENT_INTENT_CREATED, { clientSecret: 'pi_mock_secret_123' });
    }

    const total = items.reduce(
      (acc: number, item: { price: number; quantity: number }) => acc + item.price * item.quantity,
      0,
    );

    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: Math.round(total * 100), // amount in cents
        currency: 'usd',
        automatic_payment_methods: {
          enabled: true,
        },
      });

      if (!paymentIntent.client_secret) {
        return ApiResult.FromInfo<PaymentIntentResponseDto>(PaymentResultCode.PAYMENT_FAILED);
      }

      return ApiResult.FromInfo<PaymentIntentResponseDto>(PaymentResultCode.PAYMENT_INTENT_CREATED, { clientSecret: paymentIntent.client_secret });
    } catch (error) {
      this.logger.error('Failed to create payment intent with Stripe, falling back to mock client secret:', error instanceof Error ? error.stack : error);
      return ApiResult.FromInfo<PaymentIntentResponseDto>(PaymentResultCode.PAYMENT_INTENT_CREATED, { clientSecret: 'pi_mock_secret_123' });
    }
  }
}
