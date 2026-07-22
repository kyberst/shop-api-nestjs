import { Module } from '@nestjs/common';
import { AiChatController } from '@/api/controllers/ai/ai-chat.controller';
import { ClearChatHistoryController } from '@/api/controllers/ai/clear-chat-history.controller';
import { GetChatHistoryController } from '@/api/controllers/ai/get-chat-history.controller';
import { PromptLoaderService } from '@/infrastructure/services/ai/prompt-loader/prompt-loader.service';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { GeminiAiService } from '@/infrastructure/services/ai/gemini/gemini-ai.service';
import { AiChatHandler } from '@/application/use-cases/handlers/ai/ai-chat.handler';
import { GetChatHistoryHandler } from '@/application/use-cases/handlers/ai/get-chat-history.handler';
import { ClearChatHistoryHandler } from '@/application/use-cases/handlers/ai/clear-chat-history.handler';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';
import { QdrantService } from '@/infrastructure/services/ai/qdrant/qdrant.service';
import { LangChainAgentService } from '@/infrastructure/services/ai/langchain/langchain-agent.service';
import { IVectorDatabaseService } from '@/application/interfaces/ai/vector-database.interface';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';
import { IMediator } from '@/application/mediator/interfaces';
import { AiToolRegistry } from '@/application/services/ai/ai-tool-registry.service';
import { GetProductsTool } from '@/application/use-cases/ai/tools/get-products.tool';
import { GetOrdersTool } from '@/application/use-cases/ai/tools/get-orders.tool';
import { GetCategoriesTool } from '@/application/use-cases/ai/tools/get-categories.tool';
import { SearchProductsTool } from '@/application/use-cases/ai/tools/search-products.tool';
import { CreateProductTool } from '@/application/use-cases/ai/tools/create-product.tool';
import { UpdateProductTool } from '@/application/use-cases/ai/tools/update-product.tool';
import { UpdateOrderStatusTool } from '@/application/use-cases/ai/tools/update-order-status.tool';

@Module({
  controllers: [
    AiChatController,
    ClearChatHistoryController,
    GetChatHistoryController
  ],
  providers: [
    {
      provide: IPromptLoaderService,
      useClass: PromptLoaderService,
    },
    {
      provide: AiService,
      useClass: GeminiAiService,
    },
    {
      provide: IVectorDatabaseService,
      useClass: QdrantService,
    },
    {
      provide: IAgentService,
      useClass: LangChainAgentService,
    },
    {
      provide: AiChatHandler,
      useFactory: (mediator: IMediator, promptLoader: IPromptLoaderService, aiService: AiService, agent: IAgentService, registry: AiToolRegistry) => {
        return new AiChatHandler(mediator, promptLoader, aiService, agent, registry);
      },
      inject: [IMediator, IPromptLoaderService, AiService, IAgentService, AiToolRegistry],
    },
    {
      provide: 'AI_TOOLS',
      useFactory: () => [
        new GetProductsTool(),
        new GetOrdersTool(),
        new GetCategoriesTool(),
        new SearchProductsTool(),
        new CreateProductTool(),
        new UpdateProductTool(),
        new UpdateOrderStatusTool(),
      ],
    },
    AiToolRegistry,
    {
      provide: GetChatHistoryHandler,
      useFactory: (agent: IAgentService) => {
        return new GetChatHistoryHandler(agent);
      },
      inject: [IAgentService],
    },
    {
      provide: ClearChatHistoryHandler,
      useFactory: (agent: IAgentService) => {
        return new ClearChatHistoryHandler(agent);
      },
      inject: [IAgentService],
    },
    QdrantService,
    LangChainAgentService,
  ],
  exports: [AiService, QdrantService, LangChainAgentService, IVectorDatabaseService, IAgentService],
})
export class AiModule {}
