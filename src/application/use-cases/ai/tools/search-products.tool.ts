import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';

export class SearchProductsTool implements IToolExecutor {
  readonly toolName = 'searchProducts';

  async execute(args: { query: string }, _mediator: IMediator, agent: IAgentService): Promise<unknown> {
    return agent.searchProducts(args.query);
  }
}
