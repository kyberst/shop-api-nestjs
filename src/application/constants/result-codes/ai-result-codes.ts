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
}
