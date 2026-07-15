import { JSONSchemaType } from 'ajv';
import { UpdateCategoryRequestDto } from '@/application/dtos/request/categories/update-category.request.dto';

// Schema for Category update DTO
export const updateCategorySchema: JSONSchemaType<UpdateCategoryRequestDto> = {
  type: 'object',
  properties: {
    name: { type: 'string', minLength: 2, maxLength: 50 },
  },
  required: ['name'],
  additionalProperties: false,
};

