export interface ChatMessageDto {
  role: 'user' | 'assistant';
  content: string;
}

export class ChatMapper {
  static toHistoryDto(msg: any): ChatMessageDto {
    return {
      role: msg._getType() === 'human' ? 'user' : 'assistant',
      content: msg.content,
    };
  }

  static toHistoryDtoList(history: any[]): ChatMessageDto[] {
    return history.map(msg => this.toHistoryDto(msg));
  }
}
