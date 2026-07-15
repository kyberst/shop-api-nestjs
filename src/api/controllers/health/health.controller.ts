import { Controller, Get } from '@nestjs/common';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { GetSystemHealthQuery } from '@/application/use-cases/queries/health/get-system-health.query';

@Controller('health')
export class HealthController {
  constructor(private readonly mediator: Mediator) {}

  @Get()
  async getHealth() {
    const result = await this.mediator.send(new GetSystemHealthQuery());
    return result.data;
  }
}
