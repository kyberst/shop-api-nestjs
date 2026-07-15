import { UserRepository } from '@/domain/repositories/user.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { LoginResponseDto } from '@/application/dtos/response/identity/login.response.dto';

/**
 * Logic for user login.
 */
export const loginLogic = async (
  userRepository: UserRepository,
  hashService: IHashService,
  tokenService: ITokenService,
  email: string,
  password: string
): Promise<ApiResult<LoginResponseDto>> => {
  const sanitizedEmail = email.toLowerCase().trim();
  const user = await userRepository.findByEmail(sanitizedEmail);

  if (!user) {
    return ApiResult.FromInfo<LoginResponseDto>(
      IdentityResultCode.INVALID_CREDENTIALS,
      null,
    );
  }
  const isMatch = user.password ? await hashService.compare(password, user.password) : false;

  if (!isMatch) {
    return ApiResult.FromInfo<LoginResponseDto>(
      IdentityResultCode.INVALID_CREDENTIALS,
      null,
    );
  }

  const token = tokenService.sign(
    { userId: user.id, email: user.email, role: user.role || 'user' },
    { expiresIn: '7d' },
  );

  const sanitized: ISanitizedUser = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role || 'user',
  };

  return ApiResult.FromInfo(IdentityResultCode.LOGIN_SUCCESS, { user: sanitized, token });
};
