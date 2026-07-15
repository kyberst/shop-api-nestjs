import { JSONSchemaType } from 'ajv';
import { LoginRequestDto } from '@/application/dtos/request/identity/login.request.dto';

// Schema for Login DTO
export const loginSchema: JSONSchemaType<LoginRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    password: { type: 'string', format: 'password' },
  },
  required: ['email', 'password'],
  additionalProperties: false,
};
