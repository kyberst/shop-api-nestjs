import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';

export interface IAgentService {
  getChatHistory(userId: string, limit?: number): Promise<unknown>;
  clearHistory(userId: string): Promise<unknown>;
  searchProducts(query: string, limit?: number): Promise<unknown[]>;
  processChat(
    userId: string, 
    message: string, 
    dispatchTool: (name: string, args: unknown) => Promise<unknown>, 
    language?: string
  ): Promise<AiChatResponseDto>;
}

export const IAgentService = Symbol('IAgentService');
