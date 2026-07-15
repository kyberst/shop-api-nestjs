import { Category } from '@/domain/entities/category.entity';

export interface IFindByNameCategoryRepository {
  findByName(name: string): Promise<Category | null>;
}
