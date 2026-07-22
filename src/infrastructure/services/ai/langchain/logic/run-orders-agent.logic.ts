import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';

export const runOrdersAgentLogic = async (
  message: string,
  history: any[],
  dispatchTool: any,
  model: ChatGoogleGenerativeAI,
  promptLoader: IPromptLoaderService,
  language = 'en',
): Promise<any> => {
  const agentPrompt = await promptLoader.getPrompt('orders', 'agent');
  const oResponse = await model.invoke([
    new SystemMessage(`${agentPrompt}\nIMPORTANT: Your final output message must be in language: ${language}`),
    new HumanMessage(message),
  ]);

  try {
    const parsed = JSON.parse(oResponse.content as string);
    if (parsed.tool) {
      const data = await dispatchTool(parsed.tool, parsed.args || {});
      const summaryPrompt = await promptLoader.getPrompt('orders', 'summary');
      const finalAns = await model.invoke([
        new SystemMessage(`${summaryPrompt}\nIMPORTANT: You MUST summarize in language: ${language}`),
        new HumanMessage(`Operation was: ${parsed.tool}. Result data: ${JSON.stringify(data)}`),
      ]);
      return {
        message: finalAns.content as string,
        actionPerformed: parsed.tool,
        data,
      };
    }
    const fallbacks: Record<string, string> = {
      en: 'I can assist you with listing orders or updating their status.',
      es: 'Puedo ayudarte a listar pedidos o actualizar su estado.'
    };
    let fallbackMessage = fallbacks[language];
    if (!fallbackMessage) {
      const translation = await model.invoke([
        new HumanMessage(`Translate the following text to the ISO language code "${language}": "I can assist you with listing orders or updating their status." Only output the translation, nothing else.`)
      ]);
      fallbackMessage = (translation.content as string).trim();
    }
    return {
      message: parsed.message || fallbackMessage,
      actionPerformed: 'none',
      data: null,
    };
  } catch {
    return {
      message: oResponse.content as string,
      actionPerformed: 'none',
      data: null,
    };
  }
};
