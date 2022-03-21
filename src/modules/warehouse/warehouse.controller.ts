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
import {
  ApiConflictResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { WarehouseService } from './warehouse.service';

import { WarehouseDto } from './dto/warehouse.dto';
import { Warehouse } from './entities/warehouse.entity';
import {WarehouseDoc} from "./doc/warehouse.doc";

@ApiTags('warehouse')
@Controller('warehouse')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @ApiOperation({ description: 'Get all warehouses' })
  @ApiOkResponse({ type: [WarehouseDoc], status: 201 })
  @ApiNotFoundResponse({ type: 'Not found', status: 404 })
  @Get()
  getAll(): Promise<Warehouse[] | HttpException> {
    try {
      return this.warehouseService.getAll();
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Get warehouses by ID' })
  @ApiOkResponse({ type: WarehouseDoc, status: 201 })
  @ApiNotFoundResponse({ type: 'Not found', status: 404 })
  @Get('/:id')
  getById(@Param('id') id: number): Promise<Warehouse | HttpException> {
    try {
      return this.warehouseService.getById(id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Create warehouse' })
  @ApiOkResponse({ type: 'Created', status: 201 })
  @ApiConflictResponse({ type: 'Warehouse already exist', status: 409 })
  @Post()
  create(@Body() data: WarehouseDto): Promise<HttpException> {
    try {
      return this.warehouseService.create(data);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({
    description: 'Update warehouse name or add product to warehouse',
  })
  @ApiOkResponse({ type: 'Updated!', status: 201 })
  @ApiNotFoundResponse({ type: 'Warehouse does not exist!', status: 404 })
  @Patch('/:id')
  update(@Body() data: WarehouseDto,
          @Param('id') id: number): Promise<HttpException> {
    try {
      return this.warehouseService.update(data, id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Delete warehouses by ID' })
  @ApiOkResponse({ type: WarehouseDoc, status: 201 })
  @ApiNotFoundResponse({ type: 'Warehouse does not exist!', status: 404 })
  @Delete('/:id')
  delete(@Param('id') id: number): Promise<Warehouse | HttpException> {
    try {
      return this.warehouseService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
