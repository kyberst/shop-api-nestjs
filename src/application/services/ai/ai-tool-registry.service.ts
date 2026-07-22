import { Injectable, Inject } from '@nestjs/common';
import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';

@Injectable()
export class AiToolRegistry {
  private readonly tools = new Map<string, IToolExecutor>();

  constructor(@Inject('AI_TOOLS') tools: IToolExecutor[]) {
    tools.forEach(tool => this.tools.set(tool.toolName, tool));
  }

  getTool(name: string): IToolExecutor | undefined {
    return this.tools.get(name);
  }
}
