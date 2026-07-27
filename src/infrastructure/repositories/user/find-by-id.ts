import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { User, UserRoleType } from '@/domain/entities/user.entity';

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

