import { Category } from '@/domain/entities/category.entity';
import { Result } from '@/shared/types/result';

export interface IFindAllCategoriesRepository {
  findAll(): Promise<Category[]>;
}
