import { JSONSchemaType } from 'ajv';
import { UpdateRolePermissionsRequestDto } from '@/application/dtos/request/permissions/update-role-permissions.request.dto';
import { PermissionUpdateItemRequestDto } from '@/application/dtos/request/permissions/permission-update-item.request.dto';

export const updateRolePermissionsSchema: JSONSchemaType<UpdateRolePermissionsRequestDto> = {
  type: 'object',
  properties: {
    role: { type: 'string', minLength: 1 },
    permissions: {
      type: 'array',
      minItems: 1,
      items: {
        type: 'object',
        properties: {
          menuKey: { type: 'string', minLength: 1 },
          canView: { type: 'boolean' },
          canEdit: { type: 'boolean' },
          canDelete: { type: 'boolean' },
        },
        required: ['menuKey', 'canView', 'canEdit', 'canDelete'],
        additionalProperties: false,
      },
    },
  },
  required: ['role', 'permissions'],
  additionalProperties: false,
};
