import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { ProductService } from './product.service';
import { Product } from './entities/product.entity';

import { ProductDto } from './dto/product.dto';
import { MoveDto } from './dto/move.dto';
import { ProductWarehouseDto } from './dto/productWarehouse.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @ApiOperation({ description: 'Get all products' })
  @ApiOkResponse({ type: [Product] })
  @ApiNotFoundResponse({ type: NotFoundException })
  @Get()
  getAll(): Promise<Product[] | HttpException> {
    try {
      return this.productsService.getAll();
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Get product by ID' })
  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse({ type: 'Product not found!', status: 404 })
  @Get('/:id')
  getById(@Param('id') id: number): Promise<Product | HttpException> {
    try {
      return this.productsService.getById(id);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  @ApiOperation({ description: 'Get products by WarehouseID' })
  @ApiOkResponse({ type: [Product] })
  @ApiNotFoundResponse({ type: 'Products not found!', status: 404 })
  @Get('/warehouse/:id')
  getByWarehouseId(@Param('id') warehouseId: number) {
    try {
      return this.productsService.getByWarehouseId(warehouseId);
    } catch (e) {
      throw new HttpException('Something goes wrong', 400);
    }
  }

  @ApiOperation({ description: 'Create/create & add to warehouse' })
  @ApiOkResponse({ type: 'Created', status: 201 })
  @ApiBadRequestResponse({ type: 'Product already exist!', status: 409 })
  @Post()
  create(@Body() data: ProductDto): Promise<HttpException> {
    try {
      return this.productsService.create(data);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Send product to warehouse by product name' })
  @ApiOkResponse({ type: 'UnStashed', status: 201 })
  @ApiNotFoundResponse({ type: 'Product not found', status: 404 })
  @Patch('/:name')
  setToWarehouse(
    @Param('name') name: string,
    @Body() data: ProductWarehouseDto,
  ): Promise<HttpException> {
    try {
      return this.productsService.unStash(data, name);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Move product from one warehouse to another' })
  @ApiOkResponse({ type: 'Moved' })
  @ApiNotFoundResponse({ type: NotFoundException })
  @Patch('/move/:id')
  move(@Param('id') id: number, @Body() data: MoveDto): Promise<HttpException> {
    try {
      return this.productsService.moveTo(data, id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }

  @ApiOperation({ description: 'Delete product by id' })
  @ApiOkResponse({ type: Product })
  @ApiNotFoundResponse({ type: NotFoundException })
  @Delete('/:id')
  remove(@Param('id') id: number): Promise<Product | HttpException> {
    try {
      return this.productsService.remove(id);
    } catch (e) {
      throw new HttpException(e.message, 500);
    }
  }
}
