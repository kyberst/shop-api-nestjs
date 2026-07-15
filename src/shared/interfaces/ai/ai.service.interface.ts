import { AiMessage } from '@/shared/interfaces/ai/ai-message.interface';
import { AiGenerationConfig } from '@/shared/interfaces/ai/ai-generation-config.interface';
import { AiTool } from '@/shared/interfaces/ai/ai-tool.interface';
import { AiResponse } from '@/shared/interfaces/ai/ai-response.interface';

export abstract class AiService {
  abstract generateContent(
    messages: AiMessage[],
    config: AiGenerationConfig,
    tools?: AiTool[]
  ): Promise<AiResponse>;
}
