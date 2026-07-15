import { JSONSchemaType } from 'ajv';
import { UpdateUserRoleRequestDto } from '@/application/dtos/request/users/update-user-role.request.dto';

export const updateUserRoleSchema: JSONSchemaType<UpdateUserRoleRequestDto> = {
  type: 'object',
  properties: {
    role: { type: 'string', enum: ['admin', 'sales', 'user'] },
  },
  required: ['role'],
  additionalProperties: false,
};
