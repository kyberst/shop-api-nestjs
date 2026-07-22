import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { ForgotPasswordCommand } from '@/application/use-cases/commands/identity/forgot-password.command';
import { IHashService } from '@/application/interfaces/security/security.interface';
import { forgotPasswordLogic } from '@/application/use-cases/logic/identity/forgot-password.logic';

@RequestHandler(ForgotPasswordCommand)
export class ForgotPasswordHandler implements IRequestHandler<ForgotPasswordCommand, ApiResult> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: IHashService,
  ) {}

  async handle(command: ForgotPasswordCommand): Promise<ApiResult> {
      return await forgotPasswordLogic(
        this.userRepository,
        this.hashService,
        command.email,
        command.newPassword
      );
  }
}
