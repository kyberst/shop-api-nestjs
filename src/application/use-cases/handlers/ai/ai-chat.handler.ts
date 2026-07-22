import { IRequestHandler, IMediator } from '@/application/mediator/interfaces';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { ApiResult } from '@/shared/types/api-result';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';
import { RequestHandler } from '@/application/mediator/decorators';
import { AiChatCommand } from '@/application/use-cases/commands/ai/ai-chat.command';
import { AppException } from '@/shared/errors/app-exception';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';
import { aiChatLogic } from '@/application/use-cases/logic/ai/ai-chat.logic';
import { AiResultCode } from '@/application/constants/result-codes/ai-result-codes';
import { AiToolRegistry } from '@/application/services/ai/ai-tool-registry.service';

@RequestHandler(AiChatCommand)
export class AiChatHandler implements IRequestHandler<AiChatCommand, ApiResult<AiChatResponseDto>> {
  constructor(
    private readonly mediator: IMediator,
    private readonly promptLoader: IPromptLoaderService,
    private readonly aiService: AiService,
    private readonly langchainAgent: IAgentService,
    private readonly toolRegistry: AiToolRegistry,
  ) {}

  async handle(command: AiChatCommand): Promise<ApiResult<AiChatResponseDto>> {
    const systemInstruction = await this.promptLoader.compileFullSystemInstruction();

    const dispatchTool = async (name: string, args: unknown): Promise<unknown> => {
      const tool = this.toolRegistry.getTool(name);
      if (!tool) {
        throw new AppException(AiResultCode.UNKNOWN_TOOL(name));
      }
      return tool.execute(args, this.mediator, this.langchainAgent);
    };

    if (command.userId) {
      try {
        const response = await this.langchainAgent.processChat(
          command.userId,
          command.message,
          dispatchTool,
          command.language
        );
        const resDto: AiChatResponseDto = {
          message: response.message,
          actionPerformed: response.actionPerformed,
          data: response.data || null,
        };
        return ApiResult.FromInfo(AiResultCode.CHAT_SUCCESS, resDto);
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : String(e);
        return ApiResult.FromInfo(AiResultCode.LANGCHAIN_ERROR(errorMessage));
      }
    }

    return await aiChatLogic(
      this.aiService,
      systemInstruction,
      command.message,
      dispatchTool
    );
  }
}

