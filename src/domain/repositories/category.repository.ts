import { Category } from '@/domain/entities/category.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';

export abstract class CategoryRepository {
  abstract findAll(): Promise<Category[]>;
  abstract findByName(name: string): Promise<Category | null>;
  abstract save(category: Category): Promise<MutationSummary>;
  abstract update(id: string, name: string): Promise<MutationSummary>;
  abstract delete(id: string): Promise<MutationSummary>;
}
