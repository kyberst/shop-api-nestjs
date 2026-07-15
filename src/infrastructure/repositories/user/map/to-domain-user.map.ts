import { User } from '@/domain/entities/user.entity';

/**
 * Maps a database user object (Prisma or Mongo) to the domain User entity.
 * This guarantees separation of concerns and keeps infrastructure mappings decoupled.
 * 
 * @param rawUser - The raw database user record.
 * @returns The structured domain User entity.
 */
export const toDomainUser = (rawUser: any): User => {
  return {
    id: rawUser.id,
    email: rawUser.email,
    name: rawUser.name || '',
    role: (rawUser.role as 'admin' | 'sales' | 'user') || 'user',
    password: rawUser.password || undefined,
    createdAt: rawUser.createdAt,
    updatedAt: rawUser.updatedAt,
  };
};
