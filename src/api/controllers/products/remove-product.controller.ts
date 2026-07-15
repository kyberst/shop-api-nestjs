import { Controller, Delete, Param, UseGuards } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { RemoveProductCommand } from '@/application/use-cases/commands/products/remove-product.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';

@Controller('products')
export class RemoveProductController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<ApiResult> {
    return this.mediator.send(new RemoveProductCommand(id));
  }
}
