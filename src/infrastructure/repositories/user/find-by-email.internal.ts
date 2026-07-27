import { User, UserRoleType } from '@/domain/entities/user.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to find a user by email for internal operations.
 * Used for business validation, authentication, and consistency checks.
 */
export const findUserByEmailInternalLogic = async (
  prisma: PrismaService,
  email: string
): Promise<User | null> => {
  const sanitizedEmail = email.toLowerCase().trim();
  
  const result = await dbGuard(prisma, () => 
    prisma.user.findUnique({ 
      where: { email: sanitizedEmail },
      select: { id: true, email: true, name: true, password: true, role: true, createdAt: true, updatedAt: true }
    })
  );

  if (!result.ok) {
    throw new DatabaseException(
      result.error?.message || 'Internal database error finding user by email',
      result.error
    );
  }

  if (result.value) {
    const raw = result.value;
    return User.create({
      id: raw.id,
      email: raw.email,
      name: raw.name || '',
      role: raw.role as UserRoleType,
      password: raw.password ?? undefined,
      createdAt: raw.createdAt,
      updatedAt: raw.updatedAt,
    });
  }

  return null;
};

