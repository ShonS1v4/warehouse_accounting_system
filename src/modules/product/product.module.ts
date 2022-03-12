import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { Stashed } from './entities/stashed.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    forwardRef(() => WarehouseModule),
    TypeOrmModule.forFeature([Product, Stashed]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
