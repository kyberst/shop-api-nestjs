import { Order } from '@/domain/entities/order.entity';
import { OrderQueryOptions } from '@/domain/interfaces/order-query-options.interface';
import { PaginatedData } from '@/domain/types/paginated-data';

export abstract class OrderQueryRepository {
  abstract findAll(options?: OrderQueryOptions): Promise<PaginatedData<Order>>;
}
