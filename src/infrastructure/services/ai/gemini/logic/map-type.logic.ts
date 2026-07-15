import { Type } from '@google/genai';

export const mapTypeLogic = (type: string): Type => {
  switch (type) {
    case 'string': return Type.STRING;
    case 'number': return Type.NUMBER;
    case 'boolean': return Type.BOOLEAN;
    case 'object': return Type.OBJECT;
    case 'array': return Type.ARRAY;
    default: return Type.STRING;
  }
};
