import { JSONSchemaType } from 'ajv';
import { CreatePaymentIntentRequestDto } from '@/application/dtos/request/payment/create-payment-intent.request.dto';

export const createPaymentIntentSchema: JSONSchemaType<CreatePaymentIntentRequestDto> = {
  type: 'object',
  properties: {
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          price: { type: 'number', minimum: 0.01 },
          quantity: { type: 'integer', minimum: 1 },
        },
        required: ['price', 'quantity'],
        additionalProperties: true,
      },
    },
  },
  required: ['items'],
  additionalProperties: true,
};
