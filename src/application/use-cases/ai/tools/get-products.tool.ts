import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllProductsQuery } from '@/application/use-cases/queries/products/find-all-products.query';

export class GetProductsTool implements IToolExecutor {
  readonly toolName = 'getProducts';

  async execute(_args: unknown, mediator: IMediator): Promise<unknown> {
    return mediator.send(new FindAllProductsQuery());
  }
}
