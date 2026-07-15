import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@/domain/repositories/order.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { CreateOrderCommand } from '@/application/use-cases/commands/orders/create-order.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { OrderResponseDto } from '@/application/dtos/response/orders/order.response.dto';
import { createOrderLogic } from '@/application/use-cases/logic/orders/create-order.logic';

@Injectable()
@RequestHandler(CreateOrderCommand)
export class CreateOrderHandler implements IRequestHandler<CreateOrderCommand, ApiResult<OrderResponseDto>> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: CreateOrderCommand): Promise<ApiResult<OrderResponseDto>> {
      return await createOrderLogic(this.orderRepository, command.dto);
  }
}
