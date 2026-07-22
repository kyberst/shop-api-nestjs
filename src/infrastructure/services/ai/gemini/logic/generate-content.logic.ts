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
  const interaction = await aiClient.interactions.create({
    model,
    input: messages.map(m => m.content).join('\n'),
    system_instruction: config.systemInstruction,
    generation_config: {
      temperature: config.temperature,
    },
    tools: tools?.map(t => ({
      type: 'function' as const,
      name: t.name,
      description: t.description,
      parameters: t.parameters as any,
    })),
  });

  let fullOutput = '';
  const functionCalls: any[] = [];

  for (const step of interaction.steps) {
    if (step.type === 'model_output') {
      const textContent = step.content?.find(c => c.type === 'text');
      if (textContent && textContent.text) {
        fullOutput += textContent.text;
      }
    } else if (step.type === 'function_call') {
      functionCalls.push({
        name: step.name,
        args: step.arguments,
      });
    }
  }

  return {
    message: fullOutput,
    functionCalls: functionCalls.length > 0 ? functionCalls : undefined,
    rawText: fullOutput,
  };
};
