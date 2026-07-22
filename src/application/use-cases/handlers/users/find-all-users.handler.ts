import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UserRepository } from '@/domain/repositories/user.repository';
import { FindAllUsersQuery } from '@/application/use-cases/queries/users/find-all-users.query';
import { ApiResult } from '@/shared/types/api-result';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';
import { findAllUsersLogic } from '@/application/use-cases/logic/users/find-all-users.logic';


@RequestHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IRequestHandler<FindAllUsersQuery, ApiResult<ISanitizedUser[]>> {
  constructor(
    private readonly userRepository: UserRepository,
  ) {}

  async handle(query: FindAllUsersQuery): Promise<ApiResult<ISanitizedUser[]>> {
    return await findAllUsersLogic(this.userRepository);
  }
}
