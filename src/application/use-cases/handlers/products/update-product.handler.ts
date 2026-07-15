import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { UpdateProductCommand } from '@/application/use-cases/commands/products/update-product.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { updateProductLogic } from '@/application/use-cases/logic/products/update-product.logic';

@Injectable()
@RequestHandler(UpdateProductCommand)
export class UpdateProductHandler implements IRequestHandler<UpdateProductCommand, ApiResult> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: UpdateProductCommand): Promise<ApiResult> {
      return await updateProductLogic(this.productRepository, command.id, command.dto);
  }
}
