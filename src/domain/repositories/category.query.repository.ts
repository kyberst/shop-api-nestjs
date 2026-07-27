import { Category } from '@/domain/entities/category.entity';

export abstract class CategoryQueryRepository {
  abstract findAll(): Promise<Category[]>;
}
