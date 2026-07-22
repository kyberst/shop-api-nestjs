import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { QdrantService } from '@/infrastructure/services/ai/qdrant/qdrant.service';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';

export const runProductsAgentLogic = async (
  message: string,
  history: any[],
  dispatchTool: any,
  model: ChatGoogleGenerativeAI,
  qdrant: QdrantService,
  promptLoader: IPromptLoaderService,
  language = 'en',
): Promise<any> => {
  const searchDecisionPrompt = await promptLoader.getPrompt('products', 'search-decision');
  const isSearchQuery = await model.invoke([
    new SystemMessage(searchDecisionPrompt),
    new HumanMessage(`Query: ${message}\nLanguage: ${language}`),
  ]);

  if ((isSearchQuery.content as string).trim().toLowerCase().includes('search')) {
    const items = await qdrant.search(message, 5);
    if (items.length > 0) {
    const introMap: Record<string, string> = {
      en: 'Here are the products I found matching your request:',
      es: 'Aquí están los productos que encontré para tu solicitud:'
    };
    let intro = introMap[language];
    if (!intro) {
      const translation = await model.invoke([
        new HumanMessage(`Translate the following text to the ISO language code "${language}": "Here are the products I found matching your request:" Only output the translation, nothing else.`)
      ]);
      intro = (translation.content as string).trim();
    }
      return {
        message: `${intro}\n` + items.map((p: any) => `- **${p.name}** ($${p.price}): ${p.description}`).join('\n'),
        actionPerformed: 'searchProducts',
        data: items,
      };
    }
  }

  const agentPrompt = await promptLoader.getPrompt('products', 'agent');
  const pResponse = await model.invoke([
    new SystemMessage(`${agentPrompt}\nIMPORTANT: Your final output message must be in language: ${language}`),
    new HumanMessage(message),
  ]);

  try {
    const parsed = JSON.parse(pResponse.content as string);
    if (parsed.tool) {
      const data = await dispatchTool(parsed.tool, parsed.args || {});
      const summaryPrompt = await promptLoader.getPrompt('products', 'summary');
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
      en: 'I can help you with products, catalog, creation or semantic search.',
      es: 'Puedo ayudarte con productos, catálogo, creación o búsqueda semántica.'
    };
    let fallbackMessage = fallbacks[language];
    if (!fallbackMessage) {
      const translation = await model.invoke([
        new HumanMessage(`Translate the following text to the ISO language code "${language}": "I can help you with products, catalog, creation or semantic search." Only output the translation, nothing else.`)
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
      message: pResponse.content as string,
      actionPerformed: 'none',
      data: null,
    };
  }
};
