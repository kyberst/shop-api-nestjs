import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { UpdateOrderStatusCommand } from '@/application/use-cases/commands/orders/update-order-status.command';

export class UpdateOrderStatusTool implements IToolExecutor {
  readonly toolName = 'updateOrderStatus';

  async execute(args: { id: string; status: string }, mediator: IMediator): Promise<unknown> {
    return mediator.send(new UpdateOrderStatusCommand(args.id, { status: args.status as any }));
  }
}
