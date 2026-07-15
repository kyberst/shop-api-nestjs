import { Injectable } from '@nestjs/common';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { UserResultCode } from '@/application/constants/result-codes/user-result-codes';
import { UpdateUserRoleCommand } from '@/application/use-cases/commands/users/update-user-role.command';

@Injectable()
@RequestHandler(UpdateUserRoleCommand)
export class UpdateUserRoleHandler implements IRequestHandler<UpdateUserRoleCommand, ApiResult<void>> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async handle(command: UpdateUserRoleCommand): Promise<ApiResult<void>> {
    const user = await this.userRepository.findById(command.userId);
    if (!user) {
      return ApiResult.FromInfo(UserResultCode.USER_NOT_FOUND);
    }

    if (user.role === 'admin' && command.role !== 'admin') {
      const adminCount = await this.userRepository.countByRole('admin');
      if (adminCount <= 1) {
        return ApiResult.FromInfo(UserResultCode.LAST_ADMIN_ERROR);
      }
    }

    if ((user.role === 'user' && command.role !== 'user') || (user.role !== 'user' && command.role === 'user')) {
      return ApiResult.FromInfo(UserResultCode.CLIENT_ROLE_IMMUTABLE);
    }

    user.role = command.role;
    await this.userRepository.save(user);

    return ApiResult.FromInfo(UserResultCode.ROLE_UPDATED);
  }
}
