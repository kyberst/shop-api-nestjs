import { JSONSchemaType } from 'ajv';
import { CreateCategoryRequestDto } from '@/application/dtos/request/categories/create-category.request.dto';

// Schema for Category creation DTO
export const createCategorySchema: JSONSchemaType<CreateCategoryRequestDto> = {
  type: 'object',
  properties: {
    id: { type: 'string', format: 'uuid', nullable: true },
    name: { type: 'string', minLength: 2, maxLength: 50 },
  },
  required: ['name'],
  additionalProperties: false,
};

