import { User } from '@/domain/entities/user.entity';
import { ISanitizedUser } from '@/application/interfaces/identity/sanitized-user.interface';

export class UserMapper {
  static toSanitized(user: User): ISanitizedUser {
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role || 'user'
    };
  }

  static toSanitizedList(users: User[]): ISanitizedUser[] {
    return users.map(user => this.toSanitized(user));
  }
}
