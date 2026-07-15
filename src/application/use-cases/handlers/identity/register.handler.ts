import { Injectable, Inject } from '@nestjs/common';
import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RegisterCommand } from '@/application/use-cases/commands/identity/register.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { registerLogic } from '@/application/use-cases/logic/identity/register.logic';
import { RegisterResponseDto } from '@/application/dtos/response/identity/register.response.dto';

@Injectable()
@RequestHandler(RegisterCommand)
export class RegisterHandler implements IRequestHandler<RegisterCommand, ApiResult<RegisterResponseDto>> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly messageBroker: MessageBroker,
    @Inject(IHashService)
    private readonly hashService: IHashService,
    @Inject(ITokenService)
    private readonly tokenService: ITokenService,
  ) {}

  async handle(command: RegisterCommand): Promise<ApiResult<RegisterResponseDto>> {
      return await registerLogic(
        this.userRepository,
        this.hashService,
        this.tokenService,
        command.dto.email,
        command.dto.password,
        command.dto.name
      );
  }
}
