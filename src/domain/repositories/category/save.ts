import { Category } from '@/domain/entities/category.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface ISaveCategoryRepository {
  save(category: Category): Promise<MutationSummary>;
}
