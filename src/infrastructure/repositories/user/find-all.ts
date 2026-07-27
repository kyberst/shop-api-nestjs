import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { User, UserRoleType } from '@/domain/entities/user.entity';

/**
 * Logic to find all users from the Prisma database and return them as-is.
 * 
 * @param prisma - The Prisma persistence service.
 * @returns A promise that resolves to an array of domain User entities.
 */
export const findAllUsersLogic = async (prisma: PrismaService): Promise<User[]> => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    }
  });

  return users.map((user) =>
    User.create({
      id: user.id,
      email: user.email,
      name: user.name || '',
      role: user.role as UserRoleType,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    })
  );
};

