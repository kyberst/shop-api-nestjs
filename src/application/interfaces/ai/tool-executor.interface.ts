import { IMediator } from '@/application/mediator/interfaces';

export interface IToolExecutor<TArgs = unknown, TResult = unknown> {
  readonly toolName: string;
  execute(args: TArgs, mediator: IMediator, agent?: unknown): Promise<TResult>;
}
