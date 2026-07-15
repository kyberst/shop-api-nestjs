import { Injectable } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { LogoutCommand } from '@/application/use-cases/commands/identity/logout.command';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';

@Injectable()
@RequestHandler(LogoutCommand)
export class LogoutHandler implements IRequestHandler<LogoutCommand, ApiResult> {
  async handle(command: LogoutCommand): Promise<ApiResult> {
    return ApiResult.FromInfo(IdentityResultCode.LOGOUT_SUCCESS);
  }
}
