import { createOrderSchema } from './create-order.schema';
import { updateOrderStatusSchema } from './update-order-status.schema';
import { findAllOrdersSchema } from './find-all-orders.schema';

export const orderSchemas: Record<string, object> = {
  CreateOrderRequestDto: createOrderSchema as object,
  UpdateOrderStatusRequestDto: updateOrderStatusSchema as object,
  FindAllOrdersRequestDto: findAllOrdersSchema as object,
};
