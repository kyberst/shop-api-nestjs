import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllOrdersQuery } from '@/application/use-cases/queries/orders/find-all-orders.query';

export class GetOrdersTool implements IToolExecutor {
  readonly toolName = 'getOrders';

  async execute(_args: unknown, mediator: IMediator): Promise<unknown> {
    return mediator.send(new FindAllOrdersQuery());
  }
}
