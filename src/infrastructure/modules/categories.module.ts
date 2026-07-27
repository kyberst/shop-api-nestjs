import { Module } from '@nestjs/common';
import { FindAllCategoriesController } from '@/api/controllers/categories/find-all-categories.controller';
import { CreateCategoryController } from '@/api/controllers/categories/create-category.controller';
import { UpdateCategoryController } from '@/api/controllers/categories/update-category.controller';
import { RemoveCategoryController } from '@/api/controllers/categories/remove-category.controller';
import { CreateCategoryHandler } from '@/application/use-cases/handlers/categories/create-category.handler';
import { UpdateCategoryHandler } from '@/application/use-cases/handlers/categories/update-category.handler';
import { RemoveCategoryHandler } from '@/application/use-cases/handlers/categories/remove-category.handler';
import { FindAllCategoriesHandler } from '@/application/use-cases/handlers/categories/find-all-categories.handler';
import { KafkaModule } from './kafka.module';
import { CategoryCreatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/category/category-created.consumer';
import { CategoryUpdatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/category/category-updated.consumer';
import { CategoryRemovedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/category/category-removed.consumer';
import { CategoryRepository } from '@/domain/repositories/category.repository';
import { CategoryQueryRepository } from '@/domain/repositories/category.query.repository';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';

@Module({
  imports: [KafkaModule],
  controllers: [
    FindAllCategoriesController,
    CreateCategoryController,
    UpdateCategoryController,
    RemoveCategoryController,
  ],
  providers: [
    {
      provide: CreateCategoryHandler,
      useFactory: (repo: CategoryRepository, broker: MessageBroker) => {
        return new CreateCategoryHandler(repo, broker);
      },
      inject: [CategoryRepository, MessageBroker],
    },
    {
      provide: UpdateCategoryHandler,
      useFactory: (repo: CategoryRepository, broker: MessageBroker) => {
        return new UpdateCategoryHandler(repo, broker);
      },
      inject: [CategoryRepository, MessageBroker],
    },
    {
      provide: RemoveCategoryHandler,
      useFactory: (repo: CategoryRepository, broker: MessageBroker) => {
        return new RemoveCategoryHandler(repo, broker);
      },
      inject: [CategoryRepository, MessageBroker],
    },
    {
      provide: FindAllCategoriesHandler,
      useFactory: (repo: CategoryQueryRepository) => {
        return new FindAllCategoriesHandler(repo);
      },
      inject: [CategoryQueryRepository],
    },
    CategoryCreatedConsumer,
    CategoryUpdatedConsumer,
    CategoryRemovedConsumer,
  ],
})
export class CategoriesModule {}
