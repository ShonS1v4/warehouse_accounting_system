import {Controller, Delete, Get, Patch, Post} from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  getAll() {

  }

  @Get('/:id')
  getById() {

  }

  @Post()
  create() {

  }

  @Post()
  createWithWarehouse() {

  }

  @Patch('/:id')
  move() {

  }

  @Patch('remove/:productId/:warehouseId')
  removeFromWarehouse() {

  }

  @Patch('remove/:id')
  removeFromAllWarehouse() {

  }

  @Delete('/:id')
  remove() {

  }

}
