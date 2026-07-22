import { Module } from '@nestjs/common';
import { FindAllProductsController } from '@/api/controllers/products/find-all-products.controller';
import { FindAllProductsAdminController } from '@/api/controllers/products/find-all-products-admin.controller';
import { CreateProductController } from '@/api/controllers/products/create-product.controller';
import { UpdateProductController } from '@/api/controllers/products/update-product.controller';
import { RemoveProductController } from '@/api/controllers/products/remove-product.controller';
import { CreateProductHandler } from '@/application/use-cases/handlers/products/create-product.handler';
import { UpdateProductHandler } from '@/application/use-cases/handlers/products/update-product.handler';
import { RemoveProductHandler } from '@/application/use-cases/handlers/products/remove-product.handler';
import { FindAllProductsHandler } from '@/application/use-cases/handlers/products/find-all-products.handler';
import { FindAllProductsAdminHandler } from '@/application/use-cases/handlers/products/find-all-products-admin.handler';
import { KafkaModule } from '@/infrastructure/modules/kafka.module';
import { ProductCreatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/product/product-created.consumer';
import { ProductUpdatedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/product/product-updated.consumer';
import { ProductRemovedConsumer } from '@/infrastructure/services/messaging/kafka/consumers/product/product-removed.consumer';
import { AiModule } from '@/infrastructure/modules/ai.module';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { AdminProductRepository } from '@/domain/repositories/admin-product.repository';
import { StoreProductRepository } from '@/domain/repositories/store-product.repository';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { IVectorDatabaseService } from '@/application/interfaces/ai/vector-database.interface';

@Module({
  imports: [KafkaModule, AiModule],
  controllers: [
    FindAllProductsController,
    FindAllProductsAdminController,
    CreateProductController,
    UpdateProductController,
    RemoveProductController,
  ],
  providers: [
    {
      provide: CreateProductHandler,
      useFactory: (repo: ProductRepository, broker: MessageBroker, qdrant: IVectorDatabaseService) => {
        return new CreateProductHandler(repo, broker, qdrant);
      },
      inject: [ProductRepository, MessageBroker, IVectorDatabaseService],
    },
    {
      provide: UpdateProductHandler,
      useFactory: (repo: ProductRepository, broker: MessageBroker, qdrant: IVectorDatabaseService) => {
        return new UpdateProductHandler(repo, broker, qdrant);
      },
      inject: [ProductRepository, MessageBroker, IVectorDatabaseService],
    },
    {
      provide: RemoveProductHandler,
      useFactory: (repo: ProductRepository, broker: MessageBroker) => {
        return new RemoveProductHandler(repo, broker);
      },
      inject: [ProductRepository, MessageBroker],
    },
    {
      provide: FindAllProductsHandler,
      useFactory: (repo: StoreProductRepository) => {
        return new FindAllProductsHandler(repo);
      },
      inject: [StoreProductRepository],
    },
    {
      provide: FindAllProductsAdminHandler,
      useFactory: (repo: AdminProductRepository) => {
        return new FindAllProductsAdminHandler(repo);
      },
      inject: [AdminProductRepository],
    },
    ProductCreatedConsumer,
    ProductUpdatedConsumer,
    ProductRemovedConsumer,
  ],
})
export class ProductsModule {}
