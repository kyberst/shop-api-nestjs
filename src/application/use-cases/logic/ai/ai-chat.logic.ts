import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { AiMessage } from '@/shared/interfaces/ai/ai-message.interface';
import { AiGenerationConfig } from '@/shared/interfaces/ai/ai-generation-config.interface';
import { ToolDispatcher } from '@/application/types/ai/tool-dispatcher.type';
import { AI_TOOLS } from '@/application/constants/ai/ai-tools.registry';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';
import { AiResultCode } from '@/application/constants/result-codes/ai-result-codes';
import { ApiResult } from '@/shared/types/api-result';

/**
 * Logic to handle AI chat orchestration.
 */
export const aiChatLogic = async (
  aiService: AiService,
  systemInstruction: string,
  userMessage: string,
  dispatchTool: ToolDispatcher
): Promise<ApiResult<AiChatResponseDto>> => {
  const config: AiGenerationConfig = {
    systemInstruction,
    responseMimeType: 'application/json',
    responseSchema: {
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Conversational response text explaining what happened.' },
        actionPerformed: { type: 'string', description: 'Action performed name or none' },
        data: { type: 'string', description: 'Optional serialized JSON string' },
      },
      required: ['message', 'actionPerformed'],
    },
  };

  const messages: AiMessage[] = [{ role: 'user', content: userMessage }];

  // Step 1: Query the model
  const response = await aiService.generateContent(messages, config, AI_TOOLS);

  // Step 2: Check for function calls
  if (response.functionCalls && response.functionCalls.length > 0) {
    const call = response.functionCalls[0];
    
    // Execute the tool using the dispatcher
    const functionResult = await dispatchTool(call.name, call.args);

    // Step 3: Send back function results
    const updatedMessages: AiMessage[] = [
      ...messages,
      { role: 'model', content: response.rawText || '' },
      {
        role: 'function',
        name: call.name,
        content: JSON.stringify({
          functionResponse: {
            name: call.name,
            response: { output: functionResult },
          },
        }),
      },
    ];

    const finalResponse = await aiService.generateContent(updatedMessages, config);
    return parseAiResponse(finalResponse.rawText, 'An error occurred formatting the final AI response.');
  }

  return parseAiResponse(response.rawText, 'AI response text was missing.');
};

const parseAiResponse = (text: string | undefined, defaultError: string): ApiResult<AiChatResponseDto> => {
  if (!text) {
    return ApiResult.FromInfo<AiChatResponseDto>(AiResultCode.CHAT_ERROR, null, defaultError);
  }

  try {
    const data = JSON.parse(text) as AiChatResponseDto;
    return ApiResult.FromInfo(AiResultCode.CHAT_SUCCESS, data);
  } catch {
    const data: AiChatResponseDto = {
      message: text,
      actionPerformed: 'none',
      data: null,
    };
    return ApiResult.FromInfo(AiResultCode.CHAT_SUCCESS, data);
  }
};
