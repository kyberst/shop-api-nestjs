import { User } from '@/domain/entities/user.entity';
import { Result } from '@/shared/types/result';

export interface IFindByEmailUserRepository {
  findByEmail(email: string): Promise<User | null>;
}
