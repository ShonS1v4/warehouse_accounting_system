import { forwardRef, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { ProductModule } from '../product/product.module';

@Module({
  providers: [WarehouseService],
  controllers: [WarehouseController],
  imports: [
    forwardRef(() => ProductModule),
    TypeOrmModule.forFeature([Warehouse]),
  ],
  exports: [WarehouseService],
})
export class WarehouseModule {}
