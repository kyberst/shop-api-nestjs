import { Controller, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { UpdateProductRequestDto } from '@/application/dtos/request/products/update-product.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { Mediator } from '@/infrastructure/mediator/mediator.service';
import { UpdateProductCommand } from '@/application/use-cases/commands/products/update-product.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { Roles } from '@/api/decorators/roles.decorator';

@Controller('products')
export class UpdateProductController {
  constructor(
    private readonly mediator: Mediator,
  ) {}

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('admin', 'sales')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductRequestDto,
  ): Promise<ApiResult> {
    return this.mediator.send(new UpdateProductCommand(id, updateProductDto));
  }
}
