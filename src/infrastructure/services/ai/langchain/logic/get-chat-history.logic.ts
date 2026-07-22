import { PrismaService } from '@/infrastructure/persistence/prisma.service';
import { AIMessage, HumanMessage } from '@langchain/core/messages';

export const getChatHistoryLogic = async (prisma: PrismaService, userId: string, limit = 20) => {
  const messages = await prisma.chatMessage.findMany({
    where: { userId },
    orderBy: { createdAt: 'asc' },
    take: limit,
  });
  return messages.map((m: any) => {
    if (m.role === 'assistant') {
      return new AIMessage(m.content);
    }
    return new HumanMessage(m.content);
  });
};
