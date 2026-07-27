import { User, UserRoleType } from '@/domain/entities/user.entity';

/**
 * Maps a raw database user record to a domain User entity.
 * This ensures the object has access to domain-specific methods like validate(), isAdmin(), etc.,
 * resolving TypeScript errors caused by returning plain objects.
 * 
 * @param user - The raw user data from the persistence layer.
 * @returns A proper domain User entity.
 */
export const toDomainUser = (user: any): User => {
  if (!user) {
    throw new Error('[toDomainUser] Cannot map null or undefined database record to domain User');
  }

  return User.create({
    id: user.id,
    email: user.email,
    name: user.name || '',
    role: user.role as UserRoleType,
    password: user.password ?? undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  });
};
