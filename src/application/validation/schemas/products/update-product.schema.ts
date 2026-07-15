import { JSONSchemaType } from 'ajv';
import { UpdateProductRequestDto } from '@/application/dtos/request/products/update-product.request.dto';

// Schema for Product update DTO
export const updateProductSchema: JSONSchemaType<UpdateProductRequestDto> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 100, nullable: true },
    description: { type: 'string', minLength: 5, maxLength: 1000, nullable: true },
    price: { type: 'number', minimum: 0.01, nullable: true },
    image: { type: 'string', nullable: true },
    categoryId: { type: 'string', format: 'uuid', nullable: true },
    sku: { type: 'string', minLength: 1, nullable: true },
    isActive: { type: 'boolean', nullable: true },
  },
  required: [],
  additionalProperties: false,
};
