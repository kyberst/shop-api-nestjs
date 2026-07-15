import { Module, Global } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { Mediator } from './mediator.service';
import { MEDIATOR_BEHAVIORS, IMediator } from '../../application/mediator/interfaces';

@Global()
@Module({
  imports: [CqrsModule],
  providers: [
    Mediator,
    {
      provide: IMediator,
      useExisting: Mediator,
    },
    {
      provide: MEDIATOR_BEHAVIORS,
      useFactory: () => {
        return [];
      },
      inject: [],
    },
  ],
  exports: [Mediator, IMediator, CqrsModule],
})
export class MediatorModule {}
export { Mediator as MediatorService };
