import { Type } from '@google/genai';
import { mapTypeLogic } from './map-type.logic';

export const mapParametersLogic = (params: any): any => {
  return {
    type: Type.OBJECT,
    properties: Object.entries(params.properties).reduce((acc: any, [key, val]: [string, any]) => {
      acc[key] = {
        type: mapTypeLogic(val.type),
        description: val.description,
        enum: val.enum,
        properties: val.properties ? mapParametersLogic(val.properties).properties : undefined,
        required: val.required,
      };
      return acc;
    }, {}),
    required: params.required,
  };
};
