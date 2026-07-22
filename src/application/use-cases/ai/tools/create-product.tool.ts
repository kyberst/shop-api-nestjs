import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { CreateProductCommand } from '@/application/use-cases/commands/products/create-product.command';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';

export class CreateProductTool implements IToolExecutor {
  readonly toolName = 'createProduct';

  async execute(args: CreateProductRequestDto, mediator: IMediator): Promise<unknown> {
    return mediator.send(new CreateProductCommand(args));
  }
}
