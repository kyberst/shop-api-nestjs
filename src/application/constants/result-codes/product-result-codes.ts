import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class ProductResultCode {
  static readonly PRODUCTS_FOUND = new ResultInfo(true, HttpStatus.OK, 'PRODUCTS_FOUND', 'Products retrieved successfully');
  static readonly PRODUCT_CREATED = new ResultInfo(true, HttpStatus.CREATED, 'PRODUCT_CREATED', 'Product created successfully');
  static readonly PRODUCT_UPDATED = new ResultInfo(true, HttpStatus.OK, 'PRODUCT_UPDATED', 'Product updated successfully');
  static readonly PRODUCT_DELETED = new ResultInfo(true, HttpStatus.OK, 'PRODUCT_DELETED', 'Product deleted successfully');
  static readonly PRODUCT_NOT_FOUND = new ResultInfo(false, HttpStatus.NOT_FOUND, 'PRODUCT_NOT_FOUND', 'Product not found');
  static readonly PRODUCT_CREATION_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PRODUCT_CREATION_FAILED', 'Failed to create product');
  static readonly PRODUCT_UPDATE_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PRODUCT_UPDATE_FAILED', 'Failed to update product');
  static readonly PRODUCT_DELETION_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PRODUCT_DELETION_FAILED', 'Failed to delete product');
  static readonly PRODUCT_NAME_DUPLICATED = new ResultInfo(false, HttpStatus.CONFLICT, 'PRODUCT_NAME_DUPLICATED', 'A product with this name already exists');
  static readonly PRODUCTS_FETCH_FAILED = new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'PRODUCTS_FETCH_FAILED', 'Failed to fetch products');
}
