import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UpdateProductCommand } from '@/application/use-cases/commands/products/update-product.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { updateProductLogic } from '@/application/use-cases/logic/products/update-product.logic';

import { IVectorDatabaseService } from '@/application/interfaces/ai/vector-database.interface';

@RequestHandler(UpdateProductCommand)
export class UpdateProductHandler implements IRequestHandler<UpdateProductCommand, ApiResult> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly messageBroker: MessageBroker,
    private readonly qdrant: IVectorDatabaseService
  ) {}

  async handle(command: UpdateProductCommand): Promise<ApiResult> {
      const result = await updateProductLogic(this.productRepository, command.id, command.dto);
      if (result.success) {
        const product = await this.productRepository.findById(command.id);
        if (product) {
          await this.qdrant.upsertProduct({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
          });
        }
      }
      return result;
  }
}
