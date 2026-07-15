import { Module } from '@nestjs/common';
import { HealthController } from '../../api/controllers/health/health.controller';
import { KafkaModule } from './kafka.module';
import { GetSystemHealthHandler } from '../../application/use-cases/handlers/health/get-system-health.handler';

@Module({
  imports: [KafkaModule],
  controllers: [HealthController],
  providers: [GetSystemHealthHandler],
})
export class HealthModule {}
