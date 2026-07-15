import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

/**
 * DTO for the register response.
 */
export interface RegisterResponseDto {
  user: ISanitizedUser;
  token: string;
}
