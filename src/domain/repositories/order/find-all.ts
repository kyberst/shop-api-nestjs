import { Order } from '@/domain/entities/order.entity';
import { IApiResponse } from '@/shared/interfaces/api/api-response.interface';
import { PaginatedData } from '@/shared/interfaces/api/paginated-data.interface';

export interface OrderQueryOptions {
  page?: number;
  pageSize?: number;
  status?: string;
  customerEmail?: string;
  userId?: string;
}

export interface IFindAllOrdersRepository {
  findAll(options?: OrderQueryOptions): Promise<PaginatedData<Order>>;
}

