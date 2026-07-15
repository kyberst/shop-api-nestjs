import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateOrderStatusRequestDto } from '@/application/dtos/request/orders/update-order-status.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { UpdateOrderStatusCommand } from '@/application/use-cases/commands/orders/update-order-status.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class UpdateOrderStatusController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Patch(':id/status')
  @Roles('admin', 'sales')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusRequestDto,
  ): Promise<ApiResult> {
    return this.mediator.send(new UpdateOrderStatusCommand(id, updateOrderStatusDto));
  }
}
