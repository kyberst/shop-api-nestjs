import { JSONSchemaType } from 'ajv';
import { UpdateOrderStatusRequestDto } from '@/application/dtos/request/orders/update-order-status.request.dto';

// Schema for Order status update DTO
export const updateOrderStatusSchema: JSONSchemaType<UpdateOrderStatusRequestDto> = {
  type: 'object',
  properties: {
    status: { type: 'string', enum: ['Pending', 'Shipped', 'Delivered'] },
  },
  required: ['status'],
  additionalProperties: false,
};
