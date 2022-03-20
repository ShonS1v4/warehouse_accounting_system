import { forwardRef, Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { WarehouseModule } from '../warehouse/warehouse.module';
import { Stash } from './entities/stash.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  imports: [
    forwardRef(() => WarehouseModule),
    SequelizeModule.forFeature([Product, Stash]),
  ],
  exports: [ProductService],
})
export class ProductModule {}
