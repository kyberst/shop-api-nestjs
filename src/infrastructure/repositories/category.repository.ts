import { Injectable } from '@nestjs/common';
import { CategoryRepository as DomainCategoryRepository } from '@/domain/repositories/category.repository';
import { Category } from '../../domain/entities/category.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PrismaService } from '../persistence/prisma.service';
import { MongooseService } from '../persistence/mongoose.service';
import { findAllCategoriesLogic } from './category/find-all.read';
import { saveCategoryLogic } from './category/save';
import { updateCategoryLogic } from './category/update';
import { deleteCategoryLogic } from './category/delete';
import { findCategoryByNameLogic } from './category/find-by-name.internal';

@Injectable()
export class CategoryRepository extends DomainCategoryRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(): Promise<Category[]> {
    return findAllCategoriesLogic(this.mongoose);
  }

  async findByName(name: string): Promise<Category | null> {
    return findCategoryByNameLogic(this.prisma, name);
  }

  async save(category: Category): Promise<MutationSummary> {
    return saveCategoryLogic(this.prisma, category);
  }

  async update(id: string, name: string): Promise<MutationSummary> {
    return updateCategoryLogic(this.prisma, id, { name });
  }

  async delete(id: string): Promise<MutationSummary> {
    return deleteCategoryLogic(this.prisma, id);
  }
}
