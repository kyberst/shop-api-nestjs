import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { FindAllProductsQuery } from '@/application/use-cases/queries/products/find-all-products.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { findAllProductsLogic } from '@/application/use-cases/logic/products/find-all-products.logic';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

@Injectable()
@RequestHandler(FindAllProductsQuery)
export class FindAllProductsHandler implements IRequestHandler<FindAllProductsQuery, ApiResult<PaginatedData<ProductResponseDto>>> {
  constructor(
    private readonly productRepository: ProductRepository
  ) {}

  async handle(command: FindAllProductsQuery): Promise<ApiResult<PaginatedData<ProductResponseDto>>> {
      return await findAllProductsLogic(this.productRepository, command.options);
  }
}

