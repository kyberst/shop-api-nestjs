import { HttpStatus } from '@/shared/types/http-status';
import { ResultInfo } from '@/shared/types/result-info';

export class AiResultCode {
  public static readonly CHAT_SUCCESS = new ResultInfo(
    true,
    HttpStatus.OK,
    'CHAT_SUCCESS',
    'AI chat response generated successfully',
  );

  public static readonly CHAT_ERROR = new ResultInfo(
    false,
    HttpStatus.INTERNAL_SERVER_ERROR,
    'CHAT_ERROR',
    'AI chat processing failed',
  );

  static readonly HISTORY_LOADED = new ResultInfo(true, HttpStatus.OK, 'HISTORY_LOADED', 'Chat history loaded successfully');
  static readonly HISTORY_CLEARED = new ResultInfo(true, HttpStatus.OK, 'HISTORY_CLEARED', 'Chat history cleared successfully');
  static readonly UNKNOWN_TOOL = (toolName: string) => new ResultInfo(false, HttpStatus.BAD_REQUEST, 'UNKNOWN_TOOL', `Unknown tool: ${toolName}`);
  static readonly LANGCHAIN_ERROR = (error: string) => new ResultInfo(false, HttpStatus.INTERNAL_SERVER_ERROR, 'LANGCHAIN_ERROR', `Error in LangChain processing: ${error}`);
}
