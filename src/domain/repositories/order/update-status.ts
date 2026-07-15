import { Order } from '@/domain/entities/order.entity';
import { Result } from '@/shared/types/result';
import { MutationSummary } from '@/shared/types/mutation-summary';

export interface IUpdateOrderStatusRepository {
  updateStatus(id: string, status: Order['status']): Promise<MutationSummary>;
}
