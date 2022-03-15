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
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { MoveDto } from './dto/move.dto';
import { ProductWarehouseDto } from './dto/productWarehouse.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAll() {
    try {
      return this.productsService.getAll();
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Get('/:id')
  getById(@Param('id') id: number) {
    try {
      return this.productsService.getById(id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Post()
  create(@Body() data: ProductDto) {
    try {
      return this.productsService.create(data);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Patch('/:name')
  setToWarehouse(
    @Param('name') name: string,
    @Body() data: ProductWarehouseDto,
  ) {
    try {
      return this.productsService.unStash(data, name);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Patch('/move/:id')
  move(@Param('id') id: number, @Body() data: MoveDto) {
    try {
      return this.productsService.moveTo(data, id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Delete('/:id')
  remove(@Param('id') id: number) {
    try {
      return this.productsService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
