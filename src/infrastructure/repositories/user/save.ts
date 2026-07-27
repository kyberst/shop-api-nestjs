import { User } from '@/domain/entities/user.entity';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

/**
 * Fragmented logic to save a user in the database.
 */
export const saveUserLogic = async (
  prisma: PrismaService,
  user: User
): Promise<MutationSummary> => {
  const result = await dbGuard(prisma, () => 
    prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email.toLowerCase().trim(),
        name: user.name,
        password: user.password,
        role: user.role,
      },
      create: {
        id: user.id,
        email: user.email.toLowerCase().trim(),
        name: user.name,
        password: user.password,
        role: user.role || 'user',
      }
    })
  );

  if (!result.ok) {
    throw new DatabaseException(
      result.error?.message || 'Failed to save user in database',
      result.error
    );
  }

  return { affectedCount: 1 };
};
