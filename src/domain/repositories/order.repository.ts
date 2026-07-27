import { Order } from '@/domain/entities/order.entity';
import { MutationSummary } from '@/domain/types/mutation-summary';

export abstract class OrderRepository {
  abstract save(order: Order): Promise<MutationSummary>;
  abstract updateStatus(id: string, status: Order['status']): Promise<MutationSummary>;
}
