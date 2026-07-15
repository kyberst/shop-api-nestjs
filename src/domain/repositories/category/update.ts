import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface IUpdateCategoryRepository {
  update(id: string, name: string): Promise<MutationSummary>;
}
