import { Product } from '../../product/entities/product.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';

@Table
export class Warehouse extends Model {
  @ApiProperty({ example: 1 })
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: 'Warehouse Name' })
  @Column
  name: string;

  @ApiProperty({ example: [Product] })
  @HasMany(() => Product, 'warehouseId')
  products: Product[];
}
