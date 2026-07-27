import { GoogleGenAI } from '@google/genai';
import { InfrastructureException } from '@/infrastructure/exceptions/infrastructure.exception';

export const getClientLogic = (currentAi: GoogleGenAI | null): GoogleGenAI => {
  if (currentAi) return currentAi;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new InfrastructureException('AI Assistant key is not configured in the secrets dashboard. Please add GEMINI_API_KEY in Settings.');
  }
  const ai = new GoogleGenAI({ apiKey });
  return ai;
};
