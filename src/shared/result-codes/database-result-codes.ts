import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '../types/result-info';

export class DatabaseResultCode {
  static readonly DATABASE_CONNECTED = new ResultInfo(true, HttpStatus.OK, 'DATABASE_CONNECTED', 'Database is online and connected');
  static readonly DATABASE_CONNECTION_FAILED = new ResultInfo(false, HttpStatus.SERVICE_UNAVAILABLE, 'DATABASE_CONNECTION_FAILED', 'Database connection test query failed');
  static readonly DATABASE_OFFLINE = new ResultInfo(false, HttpStatus.SERVICE_UNAVAILABLE, 'DATABASE_OFFLINE', 'Database service is offline or unavailable');
}
