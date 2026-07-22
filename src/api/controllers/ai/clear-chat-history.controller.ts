import { Controller, Post, UseGuards, Req, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { IMediator } from '@/application/mediator/interfaces';
import { ClearChatHistoryCommand } from '@/application/use-cases/commands/ai/clear-chat-history.command';
import { ApiResult } from '@/shared/types/api-result';

@Controller('ai')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class ClearChatHistoryController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('chat/clear')
  async clearHistory(@Req() req: any): Promise<ApiResult<any>> {
    const userId = req.user?.id;
    return this.mediator.send(new ClearChatHistoryCommand(userId));
  }
}
