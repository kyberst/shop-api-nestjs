import { Controller, Get, Inject } from '@nestjs/common';
import { IMediator } from '@/application/mediator/interfaces';
import { GetSystemHealthQuery } from '@/application/use-cases/queries/health/get-system-health.query';

@Controller('health')
export class HealthController {
  constructor(@Inject(IMediator) private readonly mediator: IMediator) {}

  @Get()
  async getHealth() {
    const result = await this.mediator.send(new GetSystemHealthQuery());
    return result.data;
  }
}
