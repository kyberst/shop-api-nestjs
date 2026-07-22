import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UpdateCategoryCommand } from '@/application/use-cases/commands/categories/update-category.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { updateCategoryLogic } from '@/application/use-cases/logic/categories/update-category.logic';


@RequestHandler(UpdateCategoryCommand)
export class UpdateCategoryHandler implements IRequestHandler<UpdateCategoryCommand, ApiResult> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: UpdateCategoryCommand): Promise<ApiResult> {
      return await updateCategoryLogic(this.categoryRepository, command.id, command.dto);
  }
}


