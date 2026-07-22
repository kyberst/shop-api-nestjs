import { Controller, Post, UseGuards, Req, Inject } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { IMediator } from '@/application/mediator/interfaces';
import { GetChatHistoryCommand } from '@/application/use-cases/commands/ai/get-chat-history.command';
import { ApiResult } from '@/shared/types/api-result';

@Controller('ai')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class GetChatHistoryController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post('chat/history')
  async getHistory(@Req() req: any): Promise<ApiResult<any>> {
    const userId = req.user?.id;
    return this.mediator.send(new GetChatHistoryCommand(userId));
  }
}
