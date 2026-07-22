import { Category } from '@/domain/entities/category.entity';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';

export class CategoryMapper {
  static toResponse(category: Category): CategoryResponseDto {
    return {
      id: category.id,
      name: category.name,
      isActive: category.isActive,
      createdAt: category.createdAt,
      updatedAt: category.updatedAt
    };
  }

  static toResponseList(categories: Category[]): CategoryResponseDto[] {
    return categories.map(category => this.toResponse(category));
  }
}
