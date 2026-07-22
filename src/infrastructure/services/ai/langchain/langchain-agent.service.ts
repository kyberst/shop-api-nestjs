import { Injectable, Inject } from '@nestjs/common';
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';
import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { QdrantService } from '@/infrastructure/services/ai/qdrant/qdrant.service';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { IAgentService } from '@/application/interfaces/ai/agent-service.interface';
import { getModelLogic } from './logic/get-model.logic';
import { getChatHistoryLogic } from './logic/get-chat-history.logic';
import { processChatLogic } from './logic/process-chat.logic';

@Injectable()
export class LangChainAgentService implements IAgentService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly qdrant: QdrantService,
    @Inject(IPromptLoaderService)
    private readonly promptLoader: IPromptLoaderService,
  ) {}

  private getModel(): ChatGoogleGenerativeAI {
    return getModelLogic();
  }

  async getChatHistory(userId: string, limit = 20) {
    return getChatHistoryLogic(this.prisma, userId, limit);
  }

  async saveMessage(userId: string, role: 'user' | 'assistant', content: string) {
    return this.prisma.chatMessage.create({
      data: { userId, role, content },
    });
  }

  async clearHistory(userId: string) {
    return this.prisma.chatMessage.deleteMany({
      where: { userId },
    });
  }

  async searchProducts(query: string, limit = 5) {
    return this.qdrant.search(query, limit);
  }

  async processChat(
    userId: string, 
    message: string, 
    dispatchTool: (name: string, args: unknown) => Promise<unknown>, 
    language = 'en'
  ): Promise<any> {
    const history = await this.getChatHistory(userId);
    await this.saveMessage(userId, 'user', message);
    const model = this.getModel();
    
    const result = await processChatLogic(
      userId,
      message,
      dispatchTool,
      model,
      history,
      this.promptLoader,
      this.qdrant,
      language
    );

    await this.saveMessage(userId, 'assistant', result.message);

    return {
      message: result.message,
      actionPerformed: result.actionPerformed,
      data: result.rawData ? JSON.stringify(result.rawData) : null,
    };
  }
}
