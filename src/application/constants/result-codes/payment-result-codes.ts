import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class PaymentResultCode {
  static readonly PAYMENT_INTENT_CREATED = new ResultInfo(true, HttpStatus.CREATED, 'PAYMENT_INTENT_CREATED', 'Payment intent generated successfully');
  static readonly INVALID_ITEMS = new ResultInfo(false, HttpStatus.BAD_REQUEST, 'INVALID_ITEMS', 'Items are required and must be an array');
  static readonly PAYMENT_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PAYMENT_FAILED', 'Failed to process payment');
}
