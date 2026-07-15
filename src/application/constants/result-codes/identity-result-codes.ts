import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class IdentityResultCode {
  static readonly LOGIN_SUCCESS = new ResultInfo(true, HttpStatus.OK, 'LOGIN_SUCCESS', 'Login successful');
  static readonly REGISTER_SUCCESS = new ResultInfo(true, HttpStatus.CREATED, 'REGISTER_SUCCESS', 'User registered successfully');
  static readonly INVALID_CREDENTIALS = new ResultInfo(false, HttpStatus.UNAUTHORIZED, 'INVALID_CREDENTIALS', 'Invalid credentials');
  static readonly USER_ALREADY_EXISTS = new ResultInfo(false, HttpStatus.BAD_REQUEST, 'USER_ALREADY_EXISTS', 'User already exists');
  static readonly USER_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'USER_NOT_FOUND', 'User not found');
  static readonly FORGOT_PASSWORD_SUCCESS = new ResultInfo(true, HttpStatus.OK, 'FORGOT_PASSWORD_SUCCESS', 'Password updated successfully');
  static readonly LOGOUT_SUCCESS = new ResultInfo(true, HttpStatus.OK, 'LOGOUT_SUCCESS', 'Logged out successfully');
  static readonly REGISTER_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'REGISTER_FAILED', 'Failed to register user');
  static readonly USER_FETCH_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'USER_FETCH_FAILED', 'Failed to fetch user');
  static readonly PASSWORD_UPDATE_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PASSWORD_UPDATE_FAILED', 'Failed to update password');
}
