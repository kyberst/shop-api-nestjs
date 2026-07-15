import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class OrderResultCode {
  static readonly ORDERS_FOUND = new ResultInfo(true, HttpStatus.OK, 'ORDERS_FOUND', 'Orders retrieved successfully');
  static readonly ORDER_CREATED = new ResultInfo(true, HttpStatus.CREATED, 'ORDER_CREATED', 'Order created successfully');
  static readonly ORDER_STATUS_UPDATED = new ResultInfo(true, HttpStatus.OK, 'ORDER_STATUS_UPDATED', 'Order status updated successfully');
  static readonly ORDER_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'ORDER_NOT_FOUND', 'Order not found');
  static readonly ORDER_CREATION_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'ORDER_CREATION_FAILED', 'Failed to create order');
  static readonly ORDER_STATUS_UPDATE_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'ORDER_STATUS_UPDATE_FAILED', 'Failed to update order status');
  static readonly ORDERS_FETCH_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'ORDERS_FETCH_FAILED', 'Failed to fetch orders');
}
