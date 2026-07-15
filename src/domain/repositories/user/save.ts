import { User } from '@/domain/entities/user.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface ISaveUserRepository {
  save(user: User): Promise<MutationSummary>;
}
