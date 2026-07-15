import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';
import { CreateOrderRequestDto } from '@/application/dtos/request/orders/create-order.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { CreateOrderCommand } from '@/application/use-cases/commands/orders/create-order.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
export class CreateOrderController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Post()
  @Roles('admin', 'user')
  @Permissions('orders', 'edit')
  async create(@Body() createOrderDto: CreateOrderRequestDto): Promise<ApiResult<OrderResponseDto>> {
    return this.mediator.send(new CreateOrderCommand(createOrderDto));
  }
}
