import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { UserResultCode } from '@/application/constants/result-codes/user-result-codes';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';
import { UserMapper } from '@/application/mappers/user.mapper';

/**
 * Logic to find all users.
 */
export const findAllUsersLogic = async (
  userRepository: UserRepository
): Promise<ApiResult<ISanitizedUser[]>> => {
  const users = await userRepository.findAll();
  
  const sanitizedUsers = UserMapper.toSanitizedList(users);

  return ApiResult.FromInfo(UserResultCode.USERS_FOUND, sanitizedUsers);
};
