import { User } from '@/domain/entities/user.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { AppException } from '@/shared/errors/app-exception';
import { IdentityResultCode } from '@/application/constants/result-codes/identity-result-codes';

/**
 * Fragmented logic to find a user by email for read-only operations.
 * Used for API queries, read-side lookups, and reporting.
 */
export const findUserByEmailReadLogic = async (
  mongoose: MongooseService,
  email: string
): Promise<User | null> => {
  const sanitizedEmail = email.toLowerCase().trim();
  
  // Note: Assuming MongoUser model is registered in MongooseService or imported
  const result = await dbGuard(mongoose, async () => {
    // In a real implementation, this would use a Mongoose Model
    // return mongoose.connection.model('User').findOne({ email: sanitizedEmail });
    return null; // Placeholder until Mongo User Model is explicitly defined
  });

  if (!result.ok) {
    throw new AppException(
      IdentityResultCode.USER_FETCH_FAILED, 
      result.error?.message || 'Read database error'
    );
  }

  if (result.value) {
    return result.value as User;
  }

  return null;
};

