import { Injectable } from '@nestjs/common';
import { OrderQueryRepository as DomainOrderQueryRepository } from '@/domain/repositories/order.query.repository';
import { Order } from '@/domain/entities/order.entity';
import { OrderQueryOptions } from '@/domain/interfaces/order-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';
import { MongooseService } from '@/infrastructure/persistence/mongoose.service';
import { findAllOrdersLogic } from './order/find-all.read';

@Injectable()
export class OrderQueryRepository extends DomainOrderQueryRepository {
  constructor(
    private readonly mongoose: MongooseService,
  ) {
    super();
  }

  async findAll(options?: OrderQueryOptions): Promise<PaginatedData<Order>> {
    return findAllOrdersLogic(this.mongoose, options);
  }
}
