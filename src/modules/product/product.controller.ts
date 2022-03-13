import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';

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
  create(@Body() data: ProductService) {
    try {
      return this.productsService.create(data);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @Patch('/move')
  move(
    @Query('productId') productId: number,
    @Query('warehouseId') warehouseId: number,
  ) {
    try {
      return this.productsService.moveTo(productId, warehouseId);
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
