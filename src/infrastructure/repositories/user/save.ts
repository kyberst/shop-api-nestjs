import { User } from '@/domain/entities/user.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { AppException } from '@/shared/errors/app-exception';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';

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
    throw new AppException(
      IdentityResultCode.USER_FETCH_FAILED, 
      result.error?.message || 'Failed to save user'
    );
  }

  return { affectedCount: 1 };
};
