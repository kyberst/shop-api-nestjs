import { Injectable } from '@nestjs/common';
import { ProductQueryRepository as DomainProductQueryRepository } from '@/domain/repositories/product.query.repository';
import { Product } from '@/domain/entities/product.entity';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { findAllProductsLogic } from './product/find-all.read';

@Injectable()
export class ProductQueryRepository extends DomainProductQueryRepository {
  constructor(
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>> {
    return findAllProductsLogic(this.mongoose, options);
  }
}
