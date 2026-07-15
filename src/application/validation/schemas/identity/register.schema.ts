import { JSONSchemaType } from 'ajv';
import { RegisterRequestDto } from '@/application/dtos/request/identity/register.request.dto';

// Schema for Register DTO
export const registerSchema: JSONSchemaType<RegisterRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
    name: { type: 'string', minLength: 1, maxLength: 100 },
  },
  required: ['email', 'password', 'name'],
  additionalProperties: false,
};
