import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';
import { CreateOrderRequestDto } from '@/application/dtos/request/orders/create-order.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { CreateOrderCommand } from '@/application/use-cases/commands/orders/create-order.command';
import { AuthGuard } from '@/api/guards/auth.guard';

@Controller('orders')
@UseGuards(AuthGuard)
export class CreateOrderController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderRequestDto): Promise<ApiResult<OrderResponseDto>> {
    return this.mediator.send(new CreateOrderCommand(createOrderDto));
  }
}

