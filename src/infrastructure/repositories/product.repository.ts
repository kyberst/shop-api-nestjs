import { Injectable } from '@nestjs/common';
import { ProductRepository as DomainProductRepository } from '@/domain/repositories/product.repository';
import { Product } from '../../domain/entities/product.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PrismaService } from '../persistence/prisma.service';
import { MongooseService } from '../persistence/mongoose.service';
import { findAllProductsLogic } from './product/find-all.read';
import { saveProductLogic } from './product/save';
import { updateProductLogic } from './product/update';
import { deleteProductLogic } from './product/delete';
import { findProductByNameLogic } from './product/find-by-name.internal';

import { ProductQueryOptions } from '@/domain/repositories/product.repository';

@Injectable()
export class ProductRepository extends DomainProductRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(options?: ProductQueryOptions): Promise<{ items: Product[]; total: number }> {
    return findAllProductsLogic(this.mongoose, options);
  }

  async findByName(name: string): Promise<Product | null> {
    return findProductByNameLogic(this.prisma, name);
  }

  async save(product: Product): Promise<MutationSummary> {
    return saveProductLogic(this.prisma, product);
  }

  async update(id: string, updatedFields: Partial<Product>): Promise<MutationSummary> {
    return updateProductLogic(this.prisma, id, updatedFields);
  }

  async delete(id: string): Promise<MutationSummary> {
    return deleteProductLogic(this.prisma, id);
  }
}
