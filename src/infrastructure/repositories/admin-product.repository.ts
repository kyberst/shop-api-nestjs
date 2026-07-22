import { Injectable } from '@nestjs/common';
import { AdminProductRepository as DomainAdminProductRepository } from '@/domain/repositories/admin-product.repository';
import { Product } from '@/domain/entities/product.entity';
import { PaginatedData } from '@/domain/types/paginated-data';
import { ProductQueryOptions } from '@/domain/interfaces/product-query-options.interface';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { findAllAdminProductsLogic } from './product/find-all-admin';

@Injectable()
export class AdminProductRepository extends DomainAdminProductRepository {
  constructor(private readonly prisma: PrismaService) {
    super();
  }

  async findAll(options?: ProductQueryOptions): Promise<PaginatedData<Product>> {
    return findAllAdminProductsLogic(this.prisma, options);
  }
}

