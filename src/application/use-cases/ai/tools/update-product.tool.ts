import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { UpdateProductCommand } from '@/application/use-cases/commands/products/update-product.command';

export class UpdateProductTool implements IToolExecutor {
  readonly toolName = 'updateProduct';

  async execute(args: { id: string } & Record<string, unknown>, mediator: IMediator): Promise<unknown> {
    const { id, ...dto } = args;
    return mediator.send(new UpdateProductCommand(id, dto as any));
  }
}
