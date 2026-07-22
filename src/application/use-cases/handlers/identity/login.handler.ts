import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { LoginCommand } from '@/application/use-cases/commands/identity/login.command';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { loginLogic } from '@/application/use-cases/logic/identity/login.logic';
import { LoginResponseDto } from '@/application/dtos/response/identity/login.response.dto';

@RequestHandler(LoginCommand)
export class LoginHandler implements IRequestHandler<LoginCommand, ApiResult<LoginResponseDto>> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: IHashService,
    private readonly tokenService: ITokenService,
  ) {}

  async handle(command: LoginCommand): Promise<ApiResult<LoginResponseDto>> {
      return await loginLogic(
        this.userRepository,
        this.hashService,
        this.tokenService,
        command.dto.email,
        command.dto.password
      );
  }
}
