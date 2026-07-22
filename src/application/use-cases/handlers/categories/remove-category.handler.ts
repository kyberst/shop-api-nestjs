import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RemoveCategoryCommand } from '@/application/use-cases/commands/categories/remove-category.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { removeCategoryLogic } from '@/application/use-cases/logic/categories/remove-category.logic';


@RequestHandler(RemoveCategoryCommand)
export class RemoveCategoryHandler implements IRequestHandler<RemoveCategoryCommand, ApiResult> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: RemoveCategoryCommand): Promise<ApiResult> {
      return await removeCategoryLogic(this.categoryRepository, command.id);
  }
}
