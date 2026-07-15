import { JSONSchemaType } from 'ajv';

export const aiChatSchema: JSONSchemaType<{ message: string }> = {
  type: 'object',
  properties: {
    message: { type: 'string', minLength: 1 },
  },
  required: ['message'],
  additionalProperties: false,
};
