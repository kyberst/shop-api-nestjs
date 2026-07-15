import { JSONSchemaType } from 'ajv';
import { FindAllOrdersRequestDto } from '@/application/dtos/request/orders/find-all-orders.request.dto';

export const findAllOrdersSchema: JSONSchemaType<FindAllOrdersRequestDto> = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1, nullable: true },
    pageSize: { type: 'integer', minimum: 1, nullable: true },
    status: { type: 'string', nullable: true },
  },
  required: [],
  additionalProperties: true,
};
