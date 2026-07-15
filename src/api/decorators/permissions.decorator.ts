import { SetMetadata } from '@nestjs/common';

export const PERMISSIONS_KEY = 'permissions';

export interface RequiredPermission {
  menuKey: string;
  action: 'view' | 'edit' | 'delete';
}

export const Permissions = (menuKey: string, action: 'view' | 'edit' | 'delete') => 
  SetMetadata(PERMISSIONS_KEY, { menuKey, action });
