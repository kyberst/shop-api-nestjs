import { PrismaService } from '../../persistence/prisma.service';
import { User } from '@/domain/entities/user.entity';
import { toDomainUser } from './map/to-domain-user.map';

/**
 * Logic to find a single user by ID from the Prisma database and map to a domain entity.
 * 
 * @param prisma - The Prisma persistence service.
 * @param id - The unique user ID to search for.
 * @returns A promise that resolves to the domain User entity or null if not found.
 */
export const findUserByIdLogic = async (prisma: PrismaService, id: string): Promise<User | null> => {
  const user = await prisma.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  return toDomainUser(user);
};

