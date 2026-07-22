import { Order } from '@/domain/entities/order.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';
import { PaginatedData } from '@/domain/types/paginated-data';
import { OrderQueryOptions } from '@/domain/interfaces/order-query-options.interface';

export abstract class OrderRepository {
  abstract findAll(options?: OrderQueryOptions): Promise<PaginatedData<Order>>;
  abstract save(order: Order): Promise<MutationSummary>;
  abstract updateStatus(id: string, status: Order['status']): Promise<MutationSummary>;
}
