import {Body, Controller, Delete, Get, Param, Patch, Post, Query} from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseDto } from './dto/warehouse.dto';

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  public set(@Body() warehouse: WarehouseDto) {
    return this.warehouseService.create(warehouse);
  }

  @Get('/:id')
  public getById(
    @Param('id') id: number,
    @Query('relation') relation?: boolean,
  ) {
    return this.warehouseService.getById(id, relation);
  }

  @Delete('/:id')
  public remove(@Param('id') id: number) {
    return this.warehouseService.remove(id)
  }

  @Patch()
  public update(@Param('id') id: number,
                @Body() warehouseData: WarehouseDto
  ) {
    return this.warehouseService.update(id, warehouseData)
  }
}
