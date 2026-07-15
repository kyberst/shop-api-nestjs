import { Order } from '@/domain/entities/order.entity';
import { MongooseService } from '../../persistence/mongoose.service';
import { MongoOrder } from '../../persistence/mongo/order.model';
import { dbGuard } from '../../persistence/db-guard';
import { AppException } from '@/shared/errors/app-exception';
import { OrderResultCode } from '@/application/constants/result-codes/order-result-codes';
import { OrderQueryOptions } from '@/domain/repositories/order.repository';

/**
 * Fragmented logic to find all orders with filters and pagination.
 */
export const findAllOrdersLogic = async (
  mongoose: MongooseService,
  options?: OrderQueryOptions
): Promise<{ items: Order[]; total: number }> => {
  const mongoResult = await dbGuard(mongoose, async () => {
    const query: any = {};
    
    if (options?.status) {
      query.status = options.status;
    }
    
    if (options?.customerEmail || options?.userId) {
      const orClauses: any[] = [];
      if (options.customerEmail) {
        orClauses.push({ customerEmail: options.customerEmail });
      }
      if (options.userId) {
        orClauses.push({ userId: options.userId });
      }
      if (orClauses.length > 0) {
        query.$or = orClauses;
      }
    }

    const mQuery = MongoOrder.find(query, { _id: 0, __v: 0 }).sort({ date: -1 });

    if (options?.page !== undefined && options?.pageSize !== undefined) {
      const page = Number(options.page) || 1;
      const pageSize = Number(options.pageSize) || 10;
      const skip = (page - 1) * pageSize;
      mQuery.skip(skip).limit(pageSize);
    }

    const [items, total] = await Promise.all([
      mQuery.lean(),
      MongoOrder.countDocuments(query)
    ]);

    return { items: items as Order[], total };
  });

  if (mongoResult.ok) {
    return mongoResult.value;
  }

  throw new AppException(
    OrderResultCode.ORDERS_FETCH_FAILED,
    `Mongo error: ${mongoResult.error?.message}`
  );
};

