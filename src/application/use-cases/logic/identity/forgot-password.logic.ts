import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';
import { IHashService } from '@/application/interfaces/security/security.interface';

/**
 * Logic for forgot password.
 */
export const forgotPasswordLogic = async (
  userRepository: UserRepository,
  hashService: IHashService,
  email: string,
  newPassword?: string
): Promise<ApiResult> => {
  const sanitizedEmail = email.toLowerCase().trim();
  const user = await userRepository.findByEmail(sanitizedEmail);

  if (!user) {
    return ApiResult.FromInfo(IdentityResultCode.USER_NOT_FOUND, null);
  }

  if (newPassword) {
    user.password = await hashService.hash(newPassword);
    await userRepository.save(user);
  }

  return ApiResult.FromInfo(IdentityResultCode.FORGOT_PASSWORD_SUCCESS);
};
