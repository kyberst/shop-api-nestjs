import { Injectable } from '@nestjs/common';
import { ProductRepository as DomainProductRepository } from '@/domain/repositories/product.repository';
import { Product } from '@/domain/entities/product.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { findProductByIdLogic } from './product/find-by-id';
import { saveProductLogic } from './product/save';
import { updateProductLogic } from './product/update';
import { deleteProductLogic } from './product/delete';
import { findProductByNameLogic } from './product/find-by-name.internal';

@Injectable()
export class ProductRepository extends DomainProductRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {
    super();
  }

  async findById(id: string): Promise<Product | null> {
    return findProductByIdLogic(this.prisma, id);
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
