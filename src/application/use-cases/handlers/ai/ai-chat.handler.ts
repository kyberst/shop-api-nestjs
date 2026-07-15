import { Injectable, Inject } from '@nestjs/common';
import { IRequestHandler, IMediator } from '@/application/mediator/interfaces';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { ApiResult } from '@/shared/types/api-result';
import { AiChatResponseDto } from '@/application/dtos/response/ai/ai-chat.response.dto';
import { RequestHandler } from '@/application/mediator/decorators';
import { AiChatCommand } from '@/application/use-cases/commands/ai/ai-chat.command';
import { AppException } from '@/shared/errors/app-exception';
import { ResultInfo } from '@/shared/types/result-info';

import { FindAllProductsQuery } from '@/application/use-cases/queries/products/find-all-products.query';
import { FindAllOrdersQuery } from '@/application/use-cases/queries/orders/find-all-orders.query';
import { FindAllCategoriesQuery } from '@/application/use-cases/queries/categories/find-all-categories.query';
import { CreateProductCommand } from '@/application/use-cases/commands/products/create-product.command';
import { UpdateProductCommand } from '@/application/use-cases/commands/products/update-product.command';
import { UpdateOrderStatusCommand } from '@/application/use-cases/commands/orders/update-order-status.command';
import { aiChatLogic } from '@/application/use-cases/logic/ai/ai-chat.logic';

@Injectable()
@RequestHandler(AiChatCommand)
export class AiChatHandler implements IRequestHandler<AiChatCommand, ApiResult<AiChatResponseDto>> {
  constructor(
    @Inject(IMediator)
    private readonly mediator: IMediator,
    @Inject(IPromptLoaderService)
    private readonly promptLoader: IPromptLoaderService,
    private readonly aiService: AiService,
  ) {}

  async handle(command: AiChatCommand): Promise<ApiResult<AiChatResponseDto>> {
    const systemInstruction = await this.promptLoader.compileFullSystemInstruction();

    const dispatchTool = async (name: string, args: any): Promise<any> => {
      switch (name) {
        case 'getProducts':
          return this.mediator.send(new FindAllProductsQuery());
        case 'getOrders':
          return this.mediator.send(new FindAllOrdersQuery());
        case 'getCategories':
          return this.mediator.send(new FindAllCategoriesQuery());
        case 'createProduct':
          return this.mediator.send(new CreateProductCommand(args));
        case 'updateProduct': {
          const { id, ...dto } = args;
          return this.mediator.send(new UpdateProductCommand(id, dto));
        }
        case 'updateOrderStatus':
          return this.mediator.send(new UpdateOrderStatusCommand(args.id, { status: args.status }));
        default:
          throw new AppException(ResultInfo.BadRequest('UNKNOWN_TOOL', `Unknown tool: ${name}`));
      }
    };

    return await aiChatLogic(
      this.aiService,
      systemInstruction,
      command.message,
      dispatchTool
    );
  }
}

