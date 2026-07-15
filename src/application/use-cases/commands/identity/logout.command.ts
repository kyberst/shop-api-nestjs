import { IRequest } from '@/application/mediator/interfaces';
import { ApiResult } from '@/shared/types/api-result';

export class LogoutCommand extends IRequest<ApiResult> {}
