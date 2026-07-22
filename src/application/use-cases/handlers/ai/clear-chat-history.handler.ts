import { RequestHandler } from '@/application/mediator/decorators';
import { ClearChatHistoryCommand } from '@/application/use-cases/commands/ai/clear-chat-history.command';
import { ApiResult } from '@/shared/types/api-result';
import { AiResultCode } from '@/application/constants/result-codes/ai-result-codes';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';
import { IRequestHandler } from '@/application/mediator/interfaces';

@RequestHandler(ClearChatHistoryCommand)
export class ClearChatHistoryHandler implements IRequestHandler<ClearChatHistoryCommand, ApiResult<any>> {
  constructor(
    private readonly langchainAgent: IAgentService
  ) {}

  async handle(command: ClearChatHistoryCommand): Promise<ApiResult<any>> {
    await this.langchainAgent.clearHistory(command.userId);
    return ApiResult.FromInfo(AiResultCode.HISTORY_CLEARED);
  }
}
