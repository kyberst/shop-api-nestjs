import { Order } from '@/domain/entities/order.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface ISaveOrderRepository {
  save(order: Order): Promise<MutationSummary>;
}
