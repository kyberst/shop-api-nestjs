import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { RemoveProductCommand } from '@/application/use-cases/commands/products/remove-product.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { removeProductLogic } from '@/application/use-cases/logic/products/remove-product.logic';

@RequestHandler(RemoveProductCommand)
export class RemoveProductHandler implements IRequestHandler<RemoveProductCommand, ApiResult> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: RemoveProductCommand): Promise<ApiResult> {
      return await removeProductLogic(this.productRepository, command.id);
  }
}
