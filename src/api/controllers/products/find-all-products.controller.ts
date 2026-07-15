import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { FindAllProductsQuery } from '@/application/use-cases/queries/products/find-all-products.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { FindAllProductsRequestDto } from '@/application/dtos/request/products/find-all-products.request.dto';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';

@Controller('products')
export class FindAllProductsController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Get()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Permissions('products', 'view')
  async findAll(@Query() query: FindAllProductsRequestDto): Promise<ApiResult<PaginatedData<ProductResponseDto>>> {
    return this.mediator.send(new FindAllProductsQuery(query));
  }
}

