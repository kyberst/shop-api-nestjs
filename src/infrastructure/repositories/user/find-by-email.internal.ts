import { User } from '@/domain/entities/user.entity';
import { PrismaService } from '../../persistence/prisma.service';
import { dbGuard } from '../../persistence/db-guard';
import { AppException } from '@/shared/errors/app-exception';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';
import { toDomainUser } from './map/to-domain-user.map';

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
      select: { id: true, email: true, name: true, password: true, role: true }
    })
  );

  if (!result.ok) {
    throw new AppException(
      IdentityResultCode.USER_FETCH_FAILED, 
      result.error?.message || 'Internal database error'
    );
  }

  if (result.value) {
    return toDomainUser(result.value);
  }

  return null;
};

