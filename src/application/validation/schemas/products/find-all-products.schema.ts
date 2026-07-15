import { JSONSchemaType } from 'ajv';
import { FindAllProductsRequestDto } from '@/application/dtos/request/products/find-all-products.request.dto';

export const findAllProductsSchema: JSONSchemaType<FindAllProductsRequestDto> = {
  type: 'object',
  properties: {
    page: { type: 'integer', minimum: 1, nullable: true },
    pageSize: { type: 'integer', minimum: 1, nullable: true },
    search: { type: 'string', nullable: true },
    category: { type: 'string', nullable: true },
    sortBy: { type: 'string', nullable: true },
    tradeAssurance: { type: 'boolean', nullable: true },
    verifiedOnly: { type: 'boolean', nullable: true },
    minPrice: { type: 'number', minimum: 0, nullable: true },
    maxPrice: { type: 'number', minimum: 0, nullable: true },
    isAll: { type: 'boolean', nullable: true },
  },
  required: [],
  additionalProperties: true,
};
