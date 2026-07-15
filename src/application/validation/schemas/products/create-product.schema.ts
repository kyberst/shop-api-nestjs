import { JSONSchemaType } from 'ajv';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';

// Schema for Product creation DTO
export const createProductSchema: JSONSchemaType<CreateProductRequestDto> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', nullable: true },
    name: { type: 'string', minLength: 2, maxLength: 100 },
    description: { type: 'string', minLength: 5, maxLength: 1000 },
    price: { type: 'number', minimum: 0.01 },
    image: { type: 'string' },
    categoryId: { type: 'string', format: 'uuid' },
    sku: { type: 'string', minLength: 1 },
  },
  required: ['name', 'description', 'price', 'image', 'categoryId', 'sku'],
  additionalProperties: false,
};
