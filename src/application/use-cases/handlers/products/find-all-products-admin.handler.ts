import { AdminProductRepository } from '@/domain/repositories/admin-product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { FindAllProductsAdminQuery } from '@/application/use-cases/queries/products/find-all-products-admin.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { findAllProductsAdminLogic } from '@/application/use-cases/logic/products/find-all-products-admin.logic';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

@RequestHandler(FindAllProductsAdminQuery)
export class FindAllProductsAdminHandler implements IRequestHandler<FindAllProductsAdminQuery, ApiResult<PaginatedData<ProductResponseDto>>> {
  constructor(
    private readonly adminProductRepository: AdminProductRepository
  ) {}

  async handle(command: FindAllProductsAdminQuery): Promise<ApiResult<PaginatedData<ProductResponseDto>>> {
      return await findAllProductsAdminLogic(this.adminProductRepository, command.options);
  }
}
