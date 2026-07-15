import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

/**
 * DTO for the login response.
 */
export interface LoginResponseDto {
  user: ISanitizedUser;
  token: string;
}
