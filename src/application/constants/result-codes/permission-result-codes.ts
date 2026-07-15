import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class PermissionResultCode {
  static readonly PERMISSIONS_FOUND = new ResultInfo(true, HttpStatus.OK, 'PERMISSIONS_FOUND', 'Permissions retrieved successfully');
  static readonly PERMISSIONS_UPDATED = new ResultInfo(true, HttpStatus.OK, 'PERMISSIONS_UPDATED', 'Permissions updated successfully');
  static readonly PERMISSIONS_FETCH_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PERMISSIONS_FETCH_FAILED', 'Failed to fetch permissions');
  static readonly PERMISSION_UPDATE_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PERMISSION_UPDATE_FAILED', 'Failed to update permissions');
}
