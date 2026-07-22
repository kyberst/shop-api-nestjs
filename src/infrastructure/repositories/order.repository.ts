import { Injectable } from '@nestjs/common';
import { OrderRepository as DomainOrderRepository } from '@/domain/repositories/order.repository';
import { Order } from '@/domain/entities/order.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { findAllOrdersLogic } from './order/find-all.read';
import { saveOrderLogic } from './order/save';
import { updateOrderStatusLogic } from './order/update-status';

import { OrderQueryOptions } from '@/domain/interfaces/order-query-options.interface';

@Injectable()
export class OrderRepository extends DomainOrderRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(options?: OrderQueryOptions): Promise<{ items: Order[]; total: number }> {
    return findAllOrdersLogic(this.mongoose, options);
  }

  async save(order: Order): Promise<MutationSummary> {
    return saveOrderLogic(this.prisma, order);
  }

  async updateStatus(id: string, status: Order['status']): Promise<MutationSummary> {
    return updateOrderStatusLogic(this.prisma, id, status);
  }
}
