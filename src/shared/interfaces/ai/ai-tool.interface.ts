import { AiToolParameter } from './ai-tool-parameter.interface';

export interface AiTool {
  name: string;
  description: string;
  parameters?: {
    type: 'object';
    properties: Record<string, AiToolParameter>;
    required?: string[];
  };
}
