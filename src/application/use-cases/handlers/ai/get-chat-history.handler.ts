import { RequestHandler } from '@/application/mediator/decorators';
import { GetChatHistoryCommand } from '@/application/use-cases/commands/ai/get-chat-history.command';
import { ApiResult } from '@/shared/types/api-result';
import { AiResultCode } from '@/application/constants/result-codes/ai-result-codes';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';
import { ChatMapper } from '@/application/mappers/chat.mapper';
import { IRequestHandler } from '@/application/mediator/interfaces';

@RequestHandler(GetChatHistoryCommand)
export class GetChatHistoryHandler implements IRequestHandler<GetChatHistoryCommand, ApiResult<any>> {
  constructor(
    private readonly langchainAgent: IAgentService
  ) {}

  async handle(command: GetChatHistoryCommand): Promise<ApiResult<any>> {
    const history = await this.langchainAgent.getChatHistory(command.userId);
    // Convert to a simpler format for the frontend
    const formatted = ChatMapper.toHistoryDtoList(history as any[]);
    return ApiResult.FromInfo(AiResultCode.HISTORY_LOADED, formatted);
  }
}
