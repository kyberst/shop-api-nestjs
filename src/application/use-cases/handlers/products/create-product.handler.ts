import { Injectable } from '@nestjs/common';
import { ProductRepository } from '@/domain/repositories/product.repository';
import { ApiResult } from '@/shared/types/api-result';
import { IRequestHandler } from '@/application/mediator/interfaces';
import { RequestHandler } from '@/application/mediator/decorators';
import { CreateProductCommand } from '@/application/use-cases/commands/products/create-product.command';
import { MessageBroker } from '@/shared/interfaces/messaging/message-broker.interface';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { createProductLogic } from '@/application/use-cases/logic/products/create-product.logic';

@Injectable()
@RequestHandler(CreateProductCommand)
export class CreateProductHandler implements IRequestHandler<CreateProductCommand, ApiResult<ProductResponseDto>> {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly messageBroker: MessageBroker
  ) {}

  async handle(command: CreateProductCommand): Promise<ApiResult<ProductResponseDto>> {
      return await createProductLogic(this.productRepository, command.dto);
  }
}
