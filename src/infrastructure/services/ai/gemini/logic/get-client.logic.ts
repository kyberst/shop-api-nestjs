import { GoogleGenAI } from '@google/genai';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

export const getClientLogic = (currentAi: GoogleGenAI | null): GoogleGenAI => {
  if (currentAi) return currentAi;
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new AppException(ResultInfo.InternalError('AI Assistant key is not configured in the secrets dashboard. Please add GEMINI_API_KEY in Settings.'));
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
};
