import { Controller, Patch, Body, Param, UseGuards, Inject } from '@nestjs/common';
import { UpdateOrderStatusRequestDto } from '@/application/dtos/request/orders/update-order-status.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { UpdateOrderStatusCommand } from '@/application/use-cases/commands/orders/update-order-status.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';

@Controller('orders')
@UseGuards(AuthGuard, RolesGuard)
export class UpdateOrderStatusController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
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
