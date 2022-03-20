import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { Product } from './modules/product/entities/product.entity';
import { Warehouse } from './modules/warehouse/entities/warehouse.entity';
import { WarehouseModule } from './modules/warehouse/warehouse.module';
import { ProductModule } from './modules/product/product.module';
import { Stash } from './modules/product/entities/stash.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      models: [Product, Warehouse, Stash],
    }),
    WarehouseModule,
    ProductModule,
  ],
})
export class AppModule {}
