import { GoogleGenAI } from '@google/genai';
import { AiMessage } from '@/shared/interfaces/ai/ai-message.interface';
import { AiGenerationConfig } from '@/shared/interfaces/ai/ai-generation-config.interface';
import { AiTool } from '@/shared/interfaces/ai/ai-tool.interface';
import { AiResponse } from '@/shared/interfaces/ai/ai-response.interface';
import { mapParametersLogic } from './map-parameters.logic';

export const generateContentLogic = async (
  aiClient: GoogleGenAI,
  model: string,
  messages: AiMessage[],
  config: AiGenerationConfig,
  tools?: AiTool[]
): Promise<AiResponse> => {
  const geminiConfig: any = {
    systemInstruction: config.systemInstruction,
    temperature: config.temperature,
    responseMimeType: config.responseMimeType,
    responseSchema: config.responseSchema,
  };

  if (tools && tools.length > 0) {
    geminiConfig.tools = [{
      functionDeclarations: tools.map(t => ({
        name: t.name,
        description: t.description,
        parameters: t.parameters ? mapParametersLogic(t.parameters) : undefined,
      })),
    }];
  }

  const contents = messages.map(m => ({
    role: m.role === 'function' ? 'user' : (m.role === 'model' ? 'model' : 'user'),
    parts: [{ text: m.content }],
  }));

  const response = await aiClient.models.generateContent({
    model,
    contents,
    config: geminiConfig,
  } as any);

  return {
    message: response.text,
    functionCalls: response.functionCalls?.map((fc: any) => ({
      name: fc.name,
      args: fc.args,
    })),
    rawText: response.text,
  };
};
