import { Controller, Post, Body, UseGuards, Inject } from '@nestjs/common';
import { ProductResponseDto } from '@/application/dtos/response/products/product.response.dto';
import { CreateProductRequestDto } from '@/application/dtos/request/products/create-product.request.dto';
import { ApiResult } from '@/shared/types/api-result';
import { IMediator } from '@/application/mediator/interfaces';
import { CreateProductCommand } from '@/application/use-cases/commands/products/create-product.command';
import { AuthGuard } from '@/api/guards/auth.guard';
import { RolesGuard } from '@/api/guards/roles.guard';
import { PermissionsGuard } from '@/api/guards/permissions.guard';
import { Roles } from '@/api/decorators/roles.decorator';
import { Permissions } from '@/api/decorators/permissions.decorator';

@Controller('products')
export class CreateProductController {
  constructor(
    @Inject(IMediator) private readonly mediator: IMediator,
  ) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard, PermissionsGuard)
  @Roles('admin', 'sales')
  @Permissions('products', 'edit')
  async create(@Body() createProductDto: CreateProductRequestDto): Promise<ApiResult<ProductResponseDto>> {
    return this.mediator.send(new CreateProductCommand(createProductDto));
  }
}
