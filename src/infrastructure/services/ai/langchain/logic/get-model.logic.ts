import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

export const getModelLogic = (): ChatGoogleGenerativeAI => {
  return new ChatGoogleGenerativeAI({
    model: 'gemini-3.5-flash',
    apiKey: process.env.GEMINI_API_KEY,
  });
};
