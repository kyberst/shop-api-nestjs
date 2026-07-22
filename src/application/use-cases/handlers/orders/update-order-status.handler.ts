import { OrderRepository } from '@/domain/repositories/order.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UpdateOrderStatusCommand } from '@/application/use-cases/commands/orders/update-order-status.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { updateOrderStatusLogic } from '@/application/use-cases/logic/orders/update-order-status.logic';


@RequestHandler(UpdateOrderStatusCommand)
export class UpdateOrderStatusHandler implements IRequestHandler<UpdateOrderStatusCommand, ApiResult> {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: UpdateOrderStatusCommand): Promise<ApiResult> {
      const result = await updateOrderStatusLogic(this.orderRepository, command.id, command.dto);
      if (result.success) {
        await this.messageBroker.send('order-status-updated', {
          id: command.id,
          status: command.dto.status,
        });
      }
      return result;
  }
}
