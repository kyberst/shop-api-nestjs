import { createPaymentIntentSchema } from './create-payment-intent.schema';

export const paymentSchemas: Record<string, object> = {
  CreatePaymentIntentRequestDto: createPaymentIntentSchema as object,
};
