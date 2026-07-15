import { Module } from '@nestjs/common';
import { AiChatController } from '../../api/controllers/ai/ai-chat.controller';
import { PromptLoaderService } from '../services/ai/prompt-loader/prompt-loader.service';
import { IPromptLoaderService } from '@/application/interfaces/ai/prompt-loader.interface';
import { GeminiAiService } from '../services/ai/gemini/gemini-ai.service';
import { AiChatHandler } from '../../application/use-cases/handlers/ai/ai-chat.handler';
import { AiService } from '@/shared/interfaces/ai/ai.service.interface';

@Module({
  controllers: [AiChatController],
  providers: [
    {
      provide: IPromptLoaderService,
      useClass: PromptLoaderService,
    },
    {
      provide: AiService,
      useClass: GeminiAiService,
    },
    AiChatHandler,
  ],
  exports: [AiService],
})
export class AiModule {}
