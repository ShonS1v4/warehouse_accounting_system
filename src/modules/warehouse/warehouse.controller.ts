import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseDto } from './dto/warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  getAll() {
    return this.warehouseService.getAll();
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    return this.warehouseService.getById(id);
  }

  @Post()
  createEmpty(@Body() data: WarehouseDto) {
    return this.warehouseService.create(data);
  }

  @Patch()
  update(@Body() data: WarehouseDto) {
    return this.warehouseService.update(data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.warehouseService.remove(id);
  }
}
