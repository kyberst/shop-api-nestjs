import { randomUUID } from 'crypto';
import { UserRepository } from '@/domain/repositories/user.repository';
import { User } from '@/domain/entities/user.entity';
import { ApiResult } from '@/shared/types/api-result';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';
import { IHashService, ITokenService } from '@/application/interfaces/security/security.interface';
import { RegisterResponseDto } from '@/application/dtos/response/identity/register.response.dto';

/**
 * Logic for user registration.
 */
export const registerLogic = async (
  userRepository: UserRepository,
  hashService: IHashService,
  tokenService: ITokenService,
  email: string,
  password: string,
  name: string
): Promise<ApiResult<RegisterResponseDto>> => {
  const sanitizedEmail = email.toLowerCase().trim();
  const existingUser = await userRepository.findByEmail(sanitizedEmail);

  if (existingUser) {
    return ApiResult.FromInfo<RegisterResponseDto>(
      IdentityResultCode.USER_ALREADY_EXISTS,
      null,
    );
  }

  const hashedPassword = await hashService.hash(password);
  const newUser = User.create({
    id: randomUUID(),
    email: sanitizedEmail,
    password: hashedPassword,
    name,
  });

  await userRepository.save(newUser);

  const token = tokenService.sign(
    { userId: newUser.id, email: newUser.email, role: newUser.role || 'user' },
    { expiresIn: '7d' },
  );

  const sanitized: ISanitizedUser = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role || 'user',
  };

  return ApiResult.FromInfo(IdentityResultCode.REGISTER_SUCCESS, { user: sanitized, token });
};
