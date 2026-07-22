import { IToolExecutor } from '@/application/interfaces/ai/tool-executor.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { FindAllCategoriesQuery } from '@/application/use-cases/queries/categories/find-all-categories.query';

export class GetCategoriesTool implements IToolExecutor {
  readonly toolName = 'getCategories';

  async execute(_args: unknown, mediator: IMediator): Promise<unknown> {
    return mediator.send(new FindAllCategoriesQuery());
  }
}
