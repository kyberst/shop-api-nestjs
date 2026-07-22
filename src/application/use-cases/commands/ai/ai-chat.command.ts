import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';

export class AiChatCommand extends IRequest<ApiResult<AiChatResponseDto>> {
  constructor(
    public readonly message: string,
    public readonly userId?: string,
    public readonly language: string = 'en',
  ) {
    super();
  }
}
