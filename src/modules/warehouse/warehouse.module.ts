import { forwardRef, Module } from '@nestjs/common';
import { WarehouseService } from './warehouse.service';
import { WarehouseController } from './warehouse.controller';
import { Warehouse } from './entities/warehouse.entity';
import { ProductModule } from '../product/product.module';
import {SequelizeModule} from "@nestjs/sequelize";

@Module({
  providers: [WarehouseService],
  controllers: [WarehouseController],
  imports: [
    forwardRef(() => ProductModule),
    SequelizeModule.forFeature([Warehouse]),
  ],
  exports: [WarehouseService],
})
export class WarehouseModule {}
