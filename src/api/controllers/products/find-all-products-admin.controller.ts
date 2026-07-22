import { Controller, Get, Query, UseGuards, Inject } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllProductsAdminQuery } from '@/application/use-cases/queries/products/find-all-products-admin.query';
import { PaginatedData } from '@/domain/types/paginated-data';
import { FindAllProductsRequestDto } from '@/application/dtos/request/products/find-all-products.request.dto';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('products/admin')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
@Roles('admin', 'sales')
@Permissions('products', 'view')
export class FindAllProductsAdminController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Get()
  async findAll(@Query() query: FindAllProductsRequestDto): Promise<ApiResult<PaginatedData<ProductResponseDto>>> {
    return this.mediator.send(new FindAllProductsAdminQuery(query));
  }
}
