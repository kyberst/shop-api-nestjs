import { Module } from '@nestjs/common';
import { FindAllProductsController } from '../../api/controllers/products/find-all-products.controller';
import { CreateProductController } from '../../api/controllers/products/create-product.controller';
import { UpdateProductController } from '../../api/controllers/products/update-product.controller';
import { RemoveProductController } from '../../api/controllers/products/remove-product.controller';
import { CreateProductHandler } from '../../application/use-cases/handlers/products/create-product.handler';
import { UpdateProductHandler } from '../../application/use-cases/handlers/products/update-product.handler';
import { RemoveProductHandler } from '../../application/use-cases/handlers/products/remove-product.handler';
import { FindAllProductsHandler } from '../../application/use-cases/handlers/products/find-all-products.handler';
import { KafkaModule } from './kafka.module';
import { ProductCreatedConsumer } from '../services/messaging/kafka/consumers/product/product-created.consumer';
import { ProductUpdatedConsumer } from '../services/messaging/kafka/consumers/product/product-updated.consumer';
import { ProductRemovedConsumer } from '../services/messaging/kafka/consumers/product/product-removed.consumer';

@Module({
  imports: [KafkaModule],
  controllers: [
    FindAllProductsController,
    CreateProductController,
    UpdateProductController,
    RemoveProductController,
  ],
  providers: [
    CreateProductHandler,
    UpdateProductHandler,
    RemoveProductHandler,
    FindAllProductsHandler,
    ProductCreatedConsumer,
    ProductUpdatedConsumer,
    ProductRemovedConsumer,
  ],
})
export class ProductsModule {}
