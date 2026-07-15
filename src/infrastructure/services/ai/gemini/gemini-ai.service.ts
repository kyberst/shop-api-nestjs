import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { AiMessage } from '@/shared/interfaces/ai/ai-message.interface';
import { AiGenerationConfig } from '@/shared/interfaces/ai/ai-generation-config.interface';
import { AiTool } from '@/shared/interfaces/ai/ai-tool.interface';
import { AiResponse } from '@/shared/interfaces/ai/ai-response.interface';
import { getClientLogic } from './logic/get-client.logic';
import { generateContentLogic } from './logic/generate-content.logic';

@Injectable()
export class GeminiAiService extends AiService {
  private ai: GoogleGenAI | null = null;
  private readonly defaultModel = 'gemini-2.5-flash';

  private getClient(): GoogleGenAI {
    this.ai = getClientLogic(this.ai);
    return this.ai;
  }

  async generateContent(
    messages: AiMessage[],
    config: AiGenerationConfig,
    tools?: AiTool[]
  ): Promise<AiResponse> {
    const aiClient = this.getClient();
    return generateContentLogic(aiClient, this.defaultModel, messages, config, tools);
  }
}
