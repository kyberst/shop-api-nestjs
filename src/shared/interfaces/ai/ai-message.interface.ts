export interface AiMessage {
  role: 'user' | 'model' | 'system' | 'function';
  content: string;
  name?: string;
}
