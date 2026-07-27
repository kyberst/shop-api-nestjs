import { Injectable } from '@nestjs/common';
import { CategoryQueryRepository as DomainCategoryQueryRepository } from '@/domain/repositories/category.query.repository';
import { Category } from '@/domain/entities/category.entity';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { findAllCategoriesLogic } from './category/find-all.read';

@Injectable()
export class CategoryQueryRepository extends DomainCategoryQueryRepository {
  constructor(
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(): Promise<Category[]> {
    return findAllCategoriesLogic(this.mongoose);
  }
}
