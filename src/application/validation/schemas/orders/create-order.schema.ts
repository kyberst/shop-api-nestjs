import { JSONSchemaType } from 'ajv';
import { CreateOrderRequestDto } from '@/application/dtos/request/orders/create-order.request.dto';

// Schema for Order creation DTO
export const createOrderSchema: JSONSchemaType<CreateOrderRequestDto> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', nullable: true },
    userId: { type: 'string', format: 'uuid' },
    customer: { type: 'string', nullable: true },
    customerEmail: { type: 'string', nullable: true },
    items: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          productId: { type: 'string', format: 'uuid' },
          quantity: { type: 'integer', minimum: 1 },
          price: { type: 'number', minimum: 0.01 },
          name: { type: 'string', nullable: true },
          imageUrl: { type: 'string', nullable: true },
        },
        required: ['productId', 'quantity', 'price'],
        additionalProperties: true,
      },
    },
    total: { type: 'number', minimum: 0 },
    shippingAddress: { type: 'string', minLength: 5 },
  },
  required: ['userId', 'items', 'total', 'shippingAddress'],
  additionalProperties: true,
};
