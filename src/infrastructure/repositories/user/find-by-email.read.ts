import { User, UserRoleType } from '@/domain/entities/user.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { dbGuard } from '@/infrastructure/persistence/db-guard';
import { DatabaseException } from '@/infrastructure/exceptions/database.exception';

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
    throw new DatabaseException(
      result.error?.message || 'Read database error finding user by email',
      result.error
    );
  }

  if (result.value) {
    const raw = result.value as any;
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

