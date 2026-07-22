import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { runProductsAgentLogic } from './run-products-agent.logic';
import { runOrdersAgentLogic } from './run-orders-agent.logic';
import { QdrantService } from '@/infrastructure/services/ai/qdrant/qdrant.service';

export const processChatLogic = async (
  userId: string,
  message: string,
  dispatchTool: any,
  model: ChatGoogleGenerativeAI,
  history: any[],
  promptLoader: IPromptLoaderService,
  qdrant: QdrantService,
  language = 'en',
): Promise<any> => {
  // Use a combined prompt to handle both routing and action selection in one call
  const systemInstruction = await promptLoader.getPrompt('system', 'instruction');
  const productsPrompt = await promptLoader.getPrompt('products', 'agent');
  const ordersPrompt = await promptLoader.getPrompt('orders', 'agent');
  const generalPrompt = await promptLoader.getPrompt('assistant', 'general');

  const combinedPrompt = `
    ${systemInstruction}
    
    ## PRODUCT CAPABILITIES
    ${productsPrompt}
    
    ## ORDER CAPABILITIES
    ${ordersPrompt}
    
    ## GENERAL ASSISTANCE
    ${generalPrompt}
    
    IMPORTANT: 
    1. Respond in the following language: ${language}
    2. If you need to perform an action, return a JSON object like: {"tool": "toolName", "args": {...}}
    3. If you just need to reply, return a JSON object like: {"message": "your response"}
  `;

  const response = await model.invoke([
    new SystemMessage(combinedPrompt),
    ...history.slice(-5), // Only last 5 messages for speed
    new HumanMessage(message),
  ]);

  let responseText = '';
  let actionPerformed = 'none';
  let rawData: any = null;

  try {
    const content = (response.content as string).trim();
    // Simple JSON extraction if model adds markdown
    const jsonStr = content.match(/\{[\s\S]*\}/)?.[0] || content;
    const parsed = JSON.parse(jsonStr);

    if (parsed.tool) {
      // Execute the tool
      const data = await dispatchTool(parsed.tool, parsed.args || {});
      
      // Fast summary call
      const summaryResponse = await model.invoke([
        new SystemMessage(`Summarize the following tool result for the user in ${language}:`),
        new HumanMessage(`Action: ${parsed.tool}\nData: ${JSON.stringify(data)}`)
      ]);
      
      responseText = summaryResponse.content as string;
      actionPerformed = parsed.tool;
      rawData = data;
    } else {
      responseText = parsed.message || content;
    }
  } catch (error) {
    // Fallback to raw response if JSON parsing fails
    responseText = response.content as string;
  }

  return {
    message: responseText,
    actionPerformed,
    rawData,
  };
};
