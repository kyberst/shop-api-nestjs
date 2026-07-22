import { Controller, Get, UseGuards, Query, Req, Inject } from '@nestjs/common';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllOrdersQuery } from '@/application/use-cases/queries/orders/find-all-orders.query';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';
import { PaginatedData } from '@/domain/types/paginated-data';
import { FindAllOrdersRequestDto } from '@/application/dtos/request/orders/find-all-orders.request.dto';
import { RequestWithUser } from '@/shared/types/auth.interface';
import { ApiResult } from '@/shared/types/api-result';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class FindAllOrdersController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Get()
  @Roles('admin', 'sales', 'user')
  @Permissions('orders', 'view')
  async findAll(@Query() query: FindAllOrdersRequestDto, @Req() req: RequestWithUser): Promise<ApiResult<PaginatedData<OrderResponseDto>>> {
    return this.mediator.send(new FindAllOrdersQuery(query, req.user));
  }
}

