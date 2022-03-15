import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { WarehouseService } from './warehouse.service';

import { WarehouseDto } from './dto/warehouse.dto';
import {Warehouse} from "./entities/warehouse.entity";

@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Get()
  getAll(): Promise<Warehouse[] | HttpException> {
    try {
      return this.warehouseService.getAll();
    } catch (e) {
      throw new HttpException(e.message, 500)
    }
  }

  @Get('/:id')
  getById(@Param('id') id: number): Promise<Warehouse | HttpException> {
    try {
      return this.warehouseService.getById(id);
    } catch (e) {
      throw new HttpException(e.message, 500)
    }
  }

  @Post()
  create(@Body() data: WarehouseDto): Promise<HttpException> {
    try {
      return this.warehouseService.create(data);
    } catch (e) {
      throw new HttpException(e.message, 500)
    }
  }

  @Patch()
  update(@Body() data: WarehouseDto): Promise<HttpException> {
    try {
      return this.warehouseService.update(data);
    } catch (e) {
      throw new HttpException(e.message, 500)
    }
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<Warehouse | HttpException> {
    try {
      return this.warehouseService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, 500)
    }
  }
}
