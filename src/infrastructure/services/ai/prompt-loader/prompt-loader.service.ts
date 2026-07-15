import { Injectable } from '@nestjs/common';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { getPromptsRootLogic } from './logic/get-prompts-root.logic';
import { getPromptLogic } from './logic/get-prompt.logic';
import { compileFullSystemInstructionLogic } from './logic/compile-full-system-instruction.logic';

@Injectable()
export class PromptLoaderService implements IPromptLoaderService {
  private readonly promptsRoot = getPromptsRootLogic(__dirname);

  async getPrompt(category: string, filename: string): Promise<string> {
    return getPromptLogic(this.promptsRoot, category, filename);
  }

  async compileFullSystemInstruction(): Promise<string> {
    return compileFullSystemInstructionLogic((c, f) => this.getPrompt(c, f));
  }
}
