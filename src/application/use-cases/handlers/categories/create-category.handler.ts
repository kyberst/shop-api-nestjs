import { CategoryRepository } from '@/domain/repositories/category.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { CreateCategoryCommand } from '@/application/use-cases/commands/categories/create-category.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { CategoryResponseDto } from '@/application/dtos/response/categories/category.response.dto';
import { createCategoryLogic } from '@/application/use-cases/logic/categories/create-category.logic';


@RequestHandler(CreateCategoryCommand)
export class CreateCategoryHandler implements IRequestHandler<CreateCategoryCommand, ApiResult<CategoryResponseDto>> {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: CreateCategoryCommand): Promise<ApiResult<CategoryResponseDto>> {
      return await createCategoryLogic(this.categoryRepository, command.dto);
  }
}

