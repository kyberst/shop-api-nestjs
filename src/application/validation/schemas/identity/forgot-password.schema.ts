import { JSONSchemaType } from 'ajv';
import { ForgotPasswordRequestDto } from '@/application/dtos/request/identity/forgot-password.request.dto';

export const forgotPasswordSchema: JSONSchemaType<ForgotPasswordRequestDto> = {
  type: 'object',
  properties: {
    email: { type: 'string', format: 'email' },
    newPassword: { type: 'string', nullable: true },
  },
  required: ['email'],
  additionalProperties: false,
};
