import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class UserResultCode {
  static readonly USERS_FOUND = new ResultInfo(true, HttpStatus.OK, 'USERS_FOUND', 'Users retrieved successfully');
  static readonly ROLE_UPDATED = new ResultInfo(true, HttpStatus.OK, 'ROLE_UPDATED', 'User role updated successfully');
  static readonly USER_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'USER_NOT_FOUND', 'User not found');
  static readonly LAST_ADMIN_ERROR = new ResultInfo(false, HttpStatus.BAD_REQUEST, 'LAST_ADMIN_ERROR', 'There must always be at least one administrator');
  static readonly CLIENT_ROLE_IMMUTABLE = new ResultInfo(false, HttpStatus.BAD_REQUEST, 'CLIENT_ROLE_IMMUTABLE', 'Client roles cannot be changed to other roles, nor can other roles be changed to client');
}
