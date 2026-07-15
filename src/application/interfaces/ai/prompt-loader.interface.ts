export interface IPromptLoaderService {
  getPrompt(category: string, filename: string): Promise<string>;
  compileFullSystemInstruction(): Promise<string>;
}

export const IPromptLoaderService = Symbol('IPromptLoaderService');
