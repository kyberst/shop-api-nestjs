import { Injectable } from '@nestjs/common';
import { StoreProductRepository as DomainStoreProductRepository } from '@/domain/repositories/store-product.repository';
import { Product } from '@/domain/entities/product.entity';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { findAllStoreProductsLogic } from './product/find-all-store';

@Injectable()
export class StoreProductRepository extends DomainStoreProductRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>> {
    return findAllStoreProductsLogic(this.prisma, options);
  }
}

