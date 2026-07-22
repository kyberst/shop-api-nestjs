import { Controller, Delete, Param, UseGuards, Inject } from '@nestjs/common';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { RemoveProductCommand } from '@/application/use-cases/commands/products/remove-product.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';

@Controller('products')
export class RemoveProductController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin')
  async remove(@Param('id') id: string): Promise<ApiResult> {
    return this.mediator.send(new RemoveProductCommand(id));
  }
}
