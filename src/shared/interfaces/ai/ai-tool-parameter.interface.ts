export interface AiToolParameter {
  type: 'string' | 'number' | 'boolean' | 'object' | 'array';
  description?: string;
  enum?: string[];
  properties?: Record<string, AiToolParameter>;
  required?: string[];
}
