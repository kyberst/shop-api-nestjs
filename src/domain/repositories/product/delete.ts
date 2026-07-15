import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface IDeleteProductRepository {
  delete(id: string): Promise<MutationSummary>;
}
