import { Controller, Get, Query, Inject } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllProductsQuery } from '@/application/use-cases/queries/products/find-all-products.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { FindAllProductsRequestDto } from '@/application/dtos/request/products/find-all-products.request.dto';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

@Controller('products')
export class FindAllProductsController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllProductsRequestDto): Promise<ApiResult<PaginatedData<ProductResponseDto>>> {
    return this.mediator.send(new FindAllProductsQuery(query));
  }
}


