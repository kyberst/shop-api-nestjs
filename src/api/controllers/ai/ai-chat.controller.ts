import { Controller, Post, Body, UseGuards, Req, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { IMediator } from '@/application/mediator/interfaces';
import { AiChatCommand } from '@/application/use-cases/commands/ai/ai-chat.command';
import { ApiResult } from '@/shared/types/api-result';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';
import { AiChatRequestDto } from '@/application/dtos/request/ai/ai-chat.request.dto';

@Controller('ai')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class AiChatController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('chat')
  async chat(@Body() dto: AiChatRequestDto, @Req() req: any): Promise<ApiResult<AiChatResponseDto>> {
    const userId = req.user?.id;
    return this.mediator.send(new AiChatCommand(dto.message, userId, dto.language));
  }
}
