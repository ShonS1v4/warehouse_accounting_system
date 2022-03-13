import { Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  getAll() {}

  @Get('/:id')
  getById(@Param('id') id: number) {}

  @Post()
  createEmpty() {}

  @Post('/:productId')
  createWithProduct() {}

  @Patch()
  update() {}

  @Patch('/removeProducts')
  removeProducts() {}

  @Delete()
  delete() {}
}
