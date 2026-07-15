import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { AiChatCommand } from '@/application/use-cases/commands/ai/ai-chat.command';
import { ApiResult } from '@/shared/types/api-result';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';

export class AiChatDto {
  message!: string;
}

@Controller('ai')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class AiChatController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post('chat')
  @Roles('admin', 'sales')
  @Permissions('ai-assistant', 'view')
  async chat(@Body() dto: AiChatDto): Promise<ApiResult<AiChatResponseDto>> {
    return this.mediator.send(new AiChatCommand(dto.message));
  }
}

