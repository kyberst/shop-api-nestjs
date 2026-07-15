import { Module } from '@nestjs/common';
import { FindAllCategoriesController } from '../../api/controllers/categories/find-all-categories.controller';
import { CreateCategoryController } from '../../api/controllers/categories/create-category.controller';
import { UpdateCategoryController } from '../../api/controllers/categories/update-category.controller';
import { RemoveCategoryController } from '../../api/controllers/categories/remove-category.controller';
import { CreateCategoryHandler } from '../../application/use-cases/handlers/categories/create-category.handler';
import { UpdateCategoryHandler } from '../../application/use-cases/handlers/categories/update-category.handler';
import { RemoveCategoryHandler } from '../../application/use-cases/handlers/categories/remove-category.handler';
import { FindAllCategoriesHandler } from '../../application/use-cases/handlers/categories/find-all-categories.handler';
import { KafkaModule } from './kafka.module';
import { CategoryCreatedConsumer } from '../services/messaging/kafka/consumers/category/category-created.consumer';
import { CategoryUpdatedConsumer } from '../services/messaging/kafka/consumers/category/category-updated.consumer';
import { CategoryRemovedConsumer } from '../services/messaging/kafka/consumers/category/category-removed.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [
    FindAllCategoriesController,
    CreateCategoryController,
    UpdateCategoryController,
    RemoveCategoryController,
  ],
  providers: [
    CreateCategoryHandler,
    UpdateCategoryHandler,
    RemoveCategoryHandler,
    FindAllCategoriesHandler,
    CategoryCreatedConsumer,
    CategoryUpdatedConsumer,
    CategoryRemovedConsumer,
  ],
})
export class CategoriesModule {}
