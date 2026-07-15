import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class AccountResultCode {
  static readonly ACCOUNT_CREATED = new ResultInfo(true, HttpStatus.CREATED, 'ACCOUNT_CREATED', 'Account created successfully');
  static readonly ACCOUNT_OK = new ResultInfo(true, HttpStatus.OK, 'ACCOUNT_OK', 'Operation successful');
  static readonly ACCOUNT_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'ACCOUNT_NOT_FOUND', 'Account not found');
  static readonly ACCOUNT_BAD_REQUEST = new ResultInfo(false, HttpStatus.BAD_REQUEST, 'ACCOUNT_BAD_REQUEST', 'Invalid request');
}
