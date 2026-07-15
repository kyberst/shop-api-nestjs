import { Injectable, Inject, Optional } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { IRequest, IPipelineBehavior, MEDIATOR_BEHAVIORS, IMediator } from '../../application/mediator/interfaces';

@Injectable()
export class Mediator implements IMediator {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Optional()
    @Inject(MEDIATOR_BEHAVIORS)
    private readonly behaviors: IPipelineBehavior[] = []
  ) {}

  /**
   * Dispatches a request (command or query) to its registered handler,
   * passing it through the registered pipeline behaviors and ultimately
   * routing it via official @nestjs/cqrs buses.
   */
  async send<TResponse>(request: IRequest<TResponse>): Promise<TResponse> {
    let index = 0;
    const behaviors = this.behaviors || [];

    const next = async (): Promise<any> => {
      if (index < behaviors.length) {
        const behavior = behaviors[index++];
        return behavior.handle(request, next);
      }

      const requestClass = request.constructor;
      const isQuery = requestClass.name.endsWith('Query');
      if (isQuery) {
        return this.queryBus.execute(request);
      } else {
        return this.commandBus.execute(request);
      }
    };

    return next();
  }
}
export { Mediator as MediatorService };
