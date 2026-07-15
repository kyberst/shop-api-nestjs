import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class CategoryResultCode {
  static readonly CATEGORIES_FOUND = new ResultInfo(true, HttpStatus.OK, 'CATEGORIES_FOUND', 'Categories retrieved successfully');
  static readonly CATEGORY_CREATED = new ResultInfo(true, HttpStatus.CREATED, 'CATEGORY_CREATED', 'Category created successfully');
  static readonly CATEGORY_UPDATED = new ResultInfo(true, HttpStatus.OK, 'CATEGORY_UPDATED', 'Category updated successfully');
  static readonly CATEGORY_DELETED = new ResultInfo(true, HttpStatus.OK, 'CATEGORY_DELETED', 'Category deleted successfully');
  static readonly CATEGORY_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'CATEGORY_NOT_FOUND', 'Category not found');
  static readonly CATEGORY_UPDATE_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'CATEGORY_UPDATE_FAILED', 'Failed to update category');
  static readonly CATEGORY_DELETION_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'CATEGORY_DELETION_FAILED', 'Failed to delete category');
  static readonly CATEGORY_CREATION_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'CATEGORY_CREATION_FAILED', 'Failed to create category');
  static readonly CATEGORY_NAME_DUPLICATED = new ResultInfo(false, HttpStatus.CONFLICT, 'CATEGORY_NAME_DUPLICATED', 'A category with this name already exists');
  static readonly CATEGORIES_FETCH_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'CATEGORIES_FETCH_FAILED', 'Failed to fetch categories');
}
