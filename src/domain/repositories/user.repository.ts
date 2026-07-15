import { User } from '@/domain/entities/user.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';

export abstract class UserRepository {
  abstract findByEmail(email: string): Promise<User | null>;
  abstract save(user: User): Promise<MutationSummary>;
  abstract findAll(): Promise<User[]>;
  abstract findById(id: string): Promise<User | null>;
  abstract countByRole(role: 'admin' | 'sales' | 'user'): Promise<number>;
}
